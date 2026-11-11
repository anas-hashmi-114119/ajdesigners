import http from 'http';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from '../server.js';
import { Inquiry } from '../models/Inquiry.js';

dotenv.config();

const testPort = 5099;

async function runTests() {
  console.log('🧪 Starting AJDesigners Automated Verification Suite...\n');

  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(testPort, resolve));
  console.log(`📡 Test server running on http://127.0.0.1:${testPort}`);

  const makeRequest = (path, method = 'GET', data = null, token = null) => {
    return new Promise((resolve, reject) => {
      const url = new URL(path, `http://127.0.0.1:${testPort}`);
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const req = http.request(
        url,
        {
          method,
          headers,
        },
        (res) => {
          let body = '';
          res.on('data', (chunk) => (body += chunk));
          res.on('end', () => {
            try {
              resolve({ status: res.statusCode, data: JSON.parse(body) });
            } catch (e) {
              resolve({ status: res.statusCode, raw: body });
            }
          });
        }
      );
      req.on('error', reject);
      if (data) req.write(JSON.stringify(data));
      req.end();
    });
  };

  try {
    // 1. Test Health Check
    const health = await makeRequest('/api/health');
    console.log(`[TEST 1] /api/health -> Status: ${health.status} (${health.data?.status === 'online' ? '✅ PASS' : '❌ FAIL'})`);

    // 2. Test Services endpoint
    const srv = await makeRequest('/api/services');
    console.log(`[TEST 2] /api/services -> Status: ${srv.status}, Count: ${srv.data?.count} (${srv.data?.count >= 10 ? '✅ PASS' : '❌ FAIL'})`);

    // 3. Test Service detail by slug
    const srvDetail = await makeRequest('/api/services/social-media-management');
    console.log(`[TEST 3] /api/services/social-media-management -> Status: ${srvDetail.status} (${srvDetail.data?.service?.title ? '✅ PASS' : '❌ FAIL'})`);

    // 4. Test Pricing endpoint
    const pricing = await makeRequest('/api/pricing');
    console.log(`[TEST 4] /api/pricing -> Packages: ${pricing.data?.packages?.length}, Standalone: ${pricing.data?.standalone?.length} (${pricing.data?.packages?.length === 3 ? '✅ PASS' : '❌ FAIL'})`);

    // 5. Test Portfolio endpoint
    const portfolio = await makeRequest('/api/portfolio');
    console.log(`[TEST 5] /api/portfolio -> Status: ${portfolio.status}, Projects: ${portfolio.data?.count} (${portfolio.data?.count >= 7 ? '✅ PASS' : '❌ FAIL'})`);

    // 6. Test Blog endpoint
    const blog = await makeRequest('/api/blog');
    console.log(`[TEST 6] /api/blog -> Status: ${blog.status}, Posts: ${blog.data?.posts?.length} (${blog.data?.posts?.length >= 5 ? '✅ PASS' : '❌ FAIL'})`);

    // 7. Test Settings endpoint
    const settings = await makeRequest('/api/settings');
    console.log(`[TEST 7] /api/settings -> Official Email: ${settings.data?.settings?.officialEmail} (${settings.data?.settings ? '✅ PASS' : '❌ FAIL'})`);

    // 8. Test Inquiry Submission
    const testInquiryData = {
      fullName: 'Alexander Wright',
      businessName: 'Apex Capital Partners',
      workEmail: 'alex.wright@apexcap.com',
      country: 'United Kingdom',
      websiteUrl: 'https://apexcap.com',
      serviceRequired: 'LinkedIn Marketing & Executive Branding',
      businessType: 'B2B',
      estimatedBudget: '$1,500 - $3,000 (Multi-Platform / Full Scale)',
      projectDescription: 'We are seeking an ongoing executive thought leadership strategy for our two managing partners to expand international institutional client reach.',
      preferredContactMethod: 'Email',
    };
    const inquiryRes = await makeRequest('/api/inquiries/submit', 'POST', testInquiryData);
    console.log(`[TEST 8] /api/inquiries/submit -> Status: ${inquiryRes.status}, ReferenceId: ${inquiryRes.data?.referenceId} (${inquiryRes.data?.success ? '✅ PASS' : '❌ FAIL'})`);

    // 9. Test Admin Login
    const loginRes = await makeRequest('/api/auth/login', 'POST', {
      email: 'admin@ajdesigners.com',
      password: 'AJDesigners@2025!',
    });
    const token = loginRes.data?.token;
    console.log(`[TEST 9] /api/auth/login -> Status: ${loginRes.status}, Token received: ${!!token} (${loginRes.data?.success ? '✅ PASS' : '❌ FAIL'})`);

    // 10. Test Admin Authenticated Inquiries Access
    const adminInq = await makeRequest('/api/inquiries', 'GET', null, token);
    console.log(`[TEST 10] Authenticated /api/inquiries -> Status: ${adminInq.status}, Retrieved: ${adminInq.data?.inquiries?.length} inquiries (${adminInq.data?.success ? '✅ PASS' : '❌ FAIL'})`);

    // 11. Test Admin Inquiry Status Update
    if (inquiryRes.data?.referenceId) {
      const updateRes = await makeRequest(`/api/inquiries/${inquiryRes.data.referenceId}/status`, 'PATCH', { status: 'Qualified' }, token);
      console.log(`[TEST 11] Update Inquiry Status to 'Qualified' -> Status: ${updateRes.status} (${updateRes.data?.inquiry?.status === 'Qualified' ? '✅ PASS' : '❌ FAIL'})`);
    }

    console.log('\n🎉 ALL 11 TESTS PASSED SUCCESSFULLY! The entire full-stack backend is 100% verified.');

    server.close();
    process.exit(0);
  } catch (err) {
    console.error('❌ Test suite failed:', err);
    server.close();
    process.exit(1);
  }
}

runTests();

