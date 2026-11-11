import { Inquiry } from '../models/Inquiry.js';
import { sendInquiryEmails } from '../utils/emailService.js';

export const submitInquiry = async (req, res, next) => {
  try {
    const {
      fullName,
      businessName,
      workEmail,
      country,
      websiteUrl,
      serviceRequired,
      businessType,
      estimatedBudget,
      projectDescription,
      preferredContactMethod,
    } = req.body;

    if (!fullName || !businessName || !workEmail || !country || !serviceRequired || !estimatedBudget || !projectDescription) {
      return res.status(400).json({
        success: false,
        message: 'Please complete all required fields.',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(workEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid work email address.',
      });
    }

    const inquiry = await Inquiry.create({
      fullName: fullName.trim(),
      businessName: businessName.trim(),
      workEmail: workEmail.trim().toLowerCase(),
      country: country.trim(),
      websiteUrl: websiteUrl ? websiteUrl.trim() : '',
      serviceRequired: serviceRequired.trim(),
      businessType: businessType || 'B2B',
      estimatedBudget: estimatedBudget.trim(),
      projectDescription: projectDescription.trim(),
      preferredContactMethod: preferredContactMethod || 'Email',
      status: 'New',
    });

    // Send notifications in background safely
    sendInquiryEmails(inquiry).catch((err) => {
      console.error('Email notification background error:', err.message);
    });

    res.status(201).json({
      success: true,
      message: 'Inquiry received successfully. Our team will review your requirements and reach out shortly.',
      referenceId: inquiry._id,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllInquiries = async (req, res, next) => {
  try {
    const { status, search, page = 1, limit = 20 } = req.query;
    const filter = {};

    if (status && status !== 'all') {
      filter.status = status;
    }

    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      filter.$or = [
        { fullName: searchRegex },
        { businessName: searchRegex },
        { workEmail: searchRegex },
        { serviceRequired: searchRegex },
      ];
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 20;
    const skip = (pageNum - 1) * limitNum;

    const [inquiries, total] = await Promise.all([
      Inquiry.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
      Inquiry.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      inquiries,
      pagination: {
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum),
        limit: limitNum,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getInquiryById = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry record not found.',
      });
    }
    res.status(200).json({
      success: true,
      inquiry,
    });
  } catch (error) {
    next(error);
  }
};

export const updateInquiryStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Converted', 'Closed'];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value provided.',
      });
    }

    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry record not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: `Inquiry status changed to '${status}'.`,
      inquiry,
    });
  } catch (error) {
    next(error);
  }
};

export const addInternalNote = async (req, res, next) => {
  try {
    const { note } = req.body;
    if (!note || note.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Note content is required.',
      });
    }

    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry record not found.',
      });
    }

    inquiry.internalNotes.push({
      author: req.user ? req.user.name : 'Admin',
      note: note.trim(),
      createdAt: new Date(),
    });

    await inquiry.save();

    res.status(200).json({
      success: true,
      message: 'Internal note added successfully.',
      notes: inquiry.internalNotes,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Inquiry record deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};

export const exportInquiriesCsv = async (req, res, next) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });

    const headers = [
      'ID',
      'Date',
      'Full Name',
      'Business Name',
      'Email',
      'Country',
      'Website',
      'Business Type',
      'Service Required',
      'Budget',
      'Preferred Contact',
      'Status',
      'Project Description',
    ];

    const escapeCsv = (str) => {
      if (!str) return '""';
      const clean = String(str).replace(/"/g, '""');
      return `"${clean}"`;
    };

    const rows = inquiries.map((item) => [
      item._id,
      item.createdAt.toISOString().slice(0, 10),
      escapeCsv(item.fullName),
      escapeCsv(item.businessName),
      escapeCsv(item.workEmail),
      escapeCsv(item.country),
      escapeCsv(item.websiteUrl),
      escapeCsv(item.businessType),
      escapeCsv(item.serviceRequired),
      escapeCsv(item.estimatedBudget),
      escapeCsv(item.preferredContactMethod),
      escapeCsv(item.status),
      escapeCsv(item.projectDescription),
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="ajdesigners-inquiries.csv"');
    res.status(200).send(csvContent);
  } catch (error) {
    next(error);
  }
};

export const getInquiryStats = async (req, res, next) => {
  try {
    const [total, newCount, contacted, qualified, converted] = await Promise.all([
      Inquiry.countDocuments(),
      Inquiry.countDocuments({ status: 'New' }),
      Inquiry.countDocuments({ status: 'Contacted' }),
      Inquiry.countDocuments({ status: 'Qualified' }),
      Inquiry.countDocuments({ status: 'Converted' }),
    ]);

    res.status(200).json({
      success: true,
      stats: {
        total,
        new: newCount,
        contacted,
        qualified,
        converted,
      },
    });
  } catch (error) {
    next(error);
  }
};

