import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#070709] text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md p-8 rounded-3xl bg-[#111116] border border-white/10 shadow-2xl">
            <span className="w-3 h-3 rounded-full bg-red-400 inline-block mb-4 animate-ping" />
            <h2 className="text-xl font-display font-extrabold text-white">
              Something went wrong loading this view
            </h2>
            <p className="mt-2 text-xs text-gray-400 font-mono">
              {this.state.error?.message || 'A visual component encountered an issue.'}
            </p>
            <button
              onClick={this.handleReload}
              className="mt-6 px-6 py-2.5 rounded-full text-xs font-extrabold text-black bg-gradient-to-r from-[#FFF1D2] via-[#F5D791] to-[#C69341] hover:shadow-glow-gold transition-all"
            >
              Refresh Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

