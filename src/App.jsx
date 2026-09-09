```react
import React, { useState, useEffect, useMemo } from 'react';

// Modern SVG Icons
const Icons = {
  Plus: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12m6-6H6" />
    </svg>
  ),
  Users: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2m16-10a4 4 0 11-8 0 4 4 0 018 0zm-2 10V19a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  Calendar: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  DollarSign: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V6m0 12v-2m0 0c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Table: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 4h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Receipt: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 14l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Trash: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  Github: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  ),
  AlertTriangle: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  CloudUpload: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
  ),
  CloudDownload: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
    </svg>
  ),
  RefreshCw: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  PiggyBank: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  CheckCircle: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Clock: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Power: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
    </svg>
  )
};

const getTodayStr = () => new Date().toISOString().split('T')[0];

const getFirstDayOfMonthStr = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-01`;
};

// Initial default timeline seed
const initialDefaultTimeline = {
  id: 'tl_initial',
  name: 'Current Mess Cycle',
  startDate: getFirstDayOfMonthStr(),
  endDate: '', // Empty means ongoing/open
  status: 'active', // 'active' | 'completed'
  members: [
    { id: 'm1', name: 'Member A', joinDate: getFirstDayOfMonthStr(), deposit: 150 },
    { id: 'm2', name: 'Member B', joinDate: getFirstDayOfMonthStr(), deposit: 150 },
    { id: 'm3', name: 'Member C', joinDate: getFirstDayOfMonthStr(), deposit: 150 },
  ],
  expenses: [
    { id: 'e1', title: 'Groceries (Early Cycle)', amount: 180, paidBy: 'm1', date: getFirstDayOfMonthStr(), category: 'Groceries' },
    { id: 'e2', title: 'Cooking Oil & Spices', amount: 60, paidBy: 'kitty', date: getTodayStr(), category: 'Utilities' },
  ]
};

export default function App() {
  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'members' | 'expenses' | 'segments' | 'sync' | 'timelines'

  // Timeline History list stored in state
  const [timelines, setTimelines] = useState([initialDefaultTimeline]);
  const [activeTimelineId, setActiveTimelineId] = useState('tl_initial');

  // Form states with Today as default date
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberJoinDate, setNewMemberJoinDate] = useState(getTodayStr());
  const [newMemberDeposit, setNewMemberDeposit] = useState('');

  const [newExpTitle, setNewExpTitle] = useState('');
  const [newExpAmount, setNewExpAmount] = useState('');
  const [newExpPaidBy, setNewExpPaidBy] = useState('kitty');
  const [newExpDate, setNewExpDate] = useState(getTodayStr());
  const [newExpCategory, setNewExpCategory] = useState('Groceries');

  // GitHub Token & Cloud Sync State
  const [githubToken, setGithubToken] = useState('');
  const [tokenStatus, setTokenStatus] = useState('idle');
  const [githubUser, setGithubUser] = useState(null);
  const [tokenErrorDetails, setTokenErrorDetails] = useState('');
  const [gistId, setGistId] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState({ type: '', text: '' });

  // Load from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('mess_mate_timelines_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.timelines && parsed.timelines.length > 0) {
          setTimelines(parsed.timelines);
          setActiveTimelineId(parsed.activeTimelineId || parsed.timelines[0].id);
        }
        if (parsed.githubToken) {
          setGithubToken(parsed.githubToken);
          validateGithubToken(parsed.githubToken);
        }
        if (parsed.gistId) setGistId(parsed.gistId);
      } catch (e) {
        console.error("Failed to parse saved timeline data", e);
      }
    }
  }, []);

  // Sync back to LocalStorage whenever timelines or active timeline changes
  useEffect(() => {
    localStorage.setItem('mess_mate_timelines_data', JSON.stringify({
      timelines,
      activeTimelineId,
      githubToken,
      gistId
    }));
  }, [timelines, activeTimelineId, githubToken, gistId]);

  // Retrieve current active timeline object
  const activeTimeline = useMemo(() => {
    return timelines.find(t => t.id === activeTimelineId) || timelines[0] || initialDefaultTimeline;
  }, [timelines, activeTimelineId]);

  // Helper to update active timeline properties safely
  const updateActiveTimeline = (updater) => {
    setTimelines(prevTimelines => {
      return prevTimelines.map(t => {
        if (t.id === activeTimelineId) {
          return updater(t);
        }
        return t;
      });
    });
  };

  const members = activeTimeline.members || [];
  const expenses = activeTimeline.expenses || [];
  const cycleStartDate = activeTimeline.startDate || getFirstDayOfMonthStr();
  const cycleEndDate = activeTimeline.endDate || ''; // empty means ongoing
  const isCycleCompleted = activeTimeline.status === 'completed';

  const validateGithubToken = async (tokenToTest = githubToken) => {
    if (!tokenToTest || !tokenToTest.trim()) {
      setTokenStatus('idle');
      setGithubUser(null);
      setTokenErrorDetails('');
      return false;
    }

    setTokenStatus('checking');
    setTokenErrorDetails('');

    try {
      const res = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${tokenToTest.trim()}`,
          Accept: 'application/vnd.github.v3+json'
        }
      });

      if (res.ok) {
        const userData = await res.json();
        setGithubUser(userData);
        setTokenStatus('valid');
        setSyncMessage({ type: 'success', text: `GitHub token verified for @${userData.login}` });
        return true;
      } else if (res.status === 401 || res.status === 403) {
        setTokenStatus('expired');
        setGithubUser(null);
        setTokenErrorDetails('GitHub token has expired or is invalid.');
        setSyncMessage({ type: 'error', text: 'GitHub token expired (401 Unauthorized).' });
        return false;
      } else {
        setTokenStatus('error');
        setTokenErrorDetails(`GitHub API error: Status ${res.status}`);
        return false;
      }
    } catch (err) {
      setTokenStatus('error');
      setTokenErrorDetails('Network error while validating GitHub token.');
      return false;
    }
  };

  const handleBackupToGithub = async () => {
    if (!githubToken.trim()) {
      setSyncMessage({ type: 'error', text: 'Please enter a GitHub Personal Access Token first.' });
      setActiveTab('sync');
      return;
    }

    setIsSyncing(true);
    setSyncMessage({ type: '', text: '' });

    const isValid = await validateGithubToken(githubToken);
    if (!isValid) {
      setIsSyncing(false);
      return;
    }

    const payload = {
      description: 'Mess Mate Pro - Saved Timelines & Expense Records',
      public: false,
      files: {
        'mess_mate_timelines.json': {
          content: JSON.stringify({
            updatedAt: new Date().toISOString(),
            activeTimelineId,
            timelines
          }, null, 2)
        }
      }
    };

    try {
      const url = gistId ? `https://api.github.com/gists/${gistId}` : 'https://api.github.com/gists';
      const method = gistId ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${githubToken.trim()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (res.status === 401 || res.status === 403) {
        setTokenStatus('expired');
        setTokenErrorDetails('GitHub token expired during sync operation.');
        setSyncMessage({ type: 'error', text: 'Sync failed: GitHub token is expired or unauthorized.' });
      } else if (res.ok) {
        const data = await res.json();
        setGistId(data.id);
        setSyncMessage({ type: 'success', text: `Backup saved to GitHub Gist (${data.id.substring(0, 8)}...)` });
      } else {
        throw new Error(`GitHub Gist API error: ${res.status}`);
      }
    } catch (err) {
      setSyncMessage({ type: 'error', text: err.message || 'Failed to sync to GitHub Gist.' });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleRestoreFromGithub = async () => {
    if (!githubToken.trim() || !gistId.trim()) {
      setSyncMessage({ type: 'error', text: 'Token and Gist ID are required to restore backup.' });
      return;
    }

    setIsSyncing(true);
    setSyncMessage({ type: '', text: '' });

    try {
      const res = await fetch(`https://api.github.com/gists/${gistId.trim()}`, {
        headers: {
          Authorization: `Bearer ${githubToken.trim()}`,
          Accept: 'application/vnd.github.v3+json'
        }
      });

      if (res.status === 401 || res.status === 403) {
        setTokenStatus('expired');
        setTokenErrorDetails('GitHub token expired during restore operation.');
        setSyncMessage({ type: 'error', text: 'Restore failed: GitHub Token expired (401).' });
      } else if (res.ok) {
        const gistData = await res.json();
        const fileContent = gistData.files?.['mess_mate_timelines.json']?.content;
        if (fileContent) {
          const parsed = JSON.parse(fileContent);
          if (parsed.timelines) {
            setTimelines(parsed.timelines);
            if (parsed.activeTimelineId) setActiveTimelineId(parsed.activeTimelineId);
          }
          setSyncMessage({ type: 'success', text: 'Timelines successfully restored from GitHub Gist!' });
        } else {
          setSyncMessage({ type: 'error', text: 'No valid mess_mate_timelines.json found in Gist.' });
        }
      } else {
        throw new Error(`Gist not found (Status ${res.status})`);
      }
    } catch (err) {
      setSyncMessage({ type: 'error', text: err.message || 'Failed to restore backup from GitHub.' });
    } finally {
      setIsSyncing(false);
    }
  };

  // Calculate days in current timeline
  const getDaysInCycle = useMemo(() => {
    const start = new Date(cycleStartDate);
    const end = cycleEndDate ? new Date(cycleEndDate) : new Date(); // If open, count till today
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 1;
    const timeDiff = end.getTime() - start.getTime();
    return Math.max(1, Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1);
  }, [cycleStartDate, cycleEndDate]);

  // Action: End the Current Cycle
  const handleEndCycle = () => {
    const todayStr = getTodayStr();
    updateActiveTimeline(t => ({
      ...t,
      endDate: todayStr,
      status: 'completed'
    }));
    setSyncMessage({ type: 'success', text: `Timeline closed on ${todayStr}! Saved in Timeline History.` });
  };

  // Action: Re-open Cycle
  const handleReopenCycle = () => {
    updateActiveTimeline(t => ({
      ...t,
      endDate: '',
      status: 'active'
    }));
  };

  // Action: Create a New Mess Timeline / Cycle
  const handleCreateNewTimeline = () => {
    const newId = 'tl_' + Date.now();
    const count = timelines.length + 1;
    const newTl = {
      id: newId,
      name: `Mess Cycle #${count}`,
      startDate: getTodayStr(),
      endDate: '', // open-ended
      status: 'active',
      members: members.map(m => ({ ...m, deposit: 0, joinDate: getTodayStr() })),
      expenses: []
    };
    setTimelines(prev => [newTl, ...prev]);
    setActiveTimelineId(newId);
    setActiveTab('dashboard');
  };

  // Action: Delete a timeline from history
  const handleDeleteTimeline = (id, e) => {
    e.stopPropagation();
    if (timelines.length <= 1) {
      alert("Cannot delete the only timeline.");
      return;
    }
    const filtered = timelines.filter(t => t.id !== id);
    setTimelines(filtered);
    if (activeTimelineId === id) {
      setActiveTimelineId(filtered[0].id);
    }
  };

  /**
   * ACCURATE CALCULATION RULE:
   * Dynamic time-segmented calculation for current active timeline.
   */
  const calculationSummary = useMemo(() => {
    const memberStats = {};

    members.forEach(m => {
      memberStats[m.id] = {
        id: m.id,
        name: m.name,
        joinDate: m.joinDate,
        deposit: Number(m.deposit) || 0,
        directPaid: 0,
        calculatedExpenseShare: 0,
        netBalance: 0
      };
    });

    let totalMessExpenses = 0;
    let totalDeposits = 0;
    let paidFromKitty = 0;
    let paidByMembersOutOfPocket = 0;

    // Calculate total deposits
    members.forEach(m => {
      totalDeposits += Number(m.deposit) || 0;
    });

    // Effective boundary date for filtering expenses
    const effectiveEndDate = cycleEndDate || getTodayStr();

    // Process each expense chronologically
    const expenseBreakdownList = expenses.map(exp => {
      const expAmount = Number(exp.amount) || 0;
      totalMessExpenses += expAmount;

      if (exp.paidBy === 'kitty') {
        paidFromKitty += expAmount;
      } else if (memberStats[exp.paidBy]) {
        memberStats[exp.paidBy].directPaid += expAmount;
        paidByMembersOutOfPocket += expAmount;
      }

      // Find active members on expense date: joinDate <= exp.date
      const activeMembersOnDate = members.filter(m => m.joinDate <= exp.date && exp.date <= effectiveEndDate);
      const activeCount = activeMembersOnDate.length;
      const perPersonShare = activeCount > 0 ? expAmount / activeCount : 0;

      // Charge active members on expense date
      activeMembersOnDate.forEach(m => {
        if (memberStats[m.id]) {
          memberStats[m.id].calculatedExpenseShare += perPersonShare;
        }
      });

      return {
        ...exp,
        activeCount,
        perPersonShare,
        activeNames: activeMembersOnDate.map(m => m.name).join(', ') || 'No active members on date'
      };
    });

    // Net Balance = (Deposit + Direct Out-of-Pocket Payment) - Total Calculated Expense Share
    Object.values(memberStats).forEach(ms => {
      ms.netBalance = (ms.deposit + ms.directPaid) - ms.calculatedExpenseShare;
    });

    const remainingKittyBalance = totalDeposits - paidFromKitty;

    return {
      totalMessExpenses,
      totalDeposits,
      paidFromKitty,
      paidByMembersOutOfPocket,
      remainingKittyBalance,
      memberStats: Object.values(memberStats),
      expenseBreakdownList
    };
  }, [members, expenses, cycleEndDate]);

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;
    const newM = {
      id: 'm_' + Date.now(),
      name: newMemberName.trim(),
      joinDate: newMemberJoinDate || getTodayStr(),
      deposit: Number(newMemberDeposit) || 0
    };
    updateActiveTimeline(t => ({
      ...t,
      members: [...t.members, newM]
    }));
    setNewMemberName('');
    setNewMemberDeposit('');
    setNewMemberJoinDate(getTodayStr());
  };

  const handleDeleteMember = (id) => {
    updateActiveTimeline(t => ({
      ...t,
      members: t.members.filter(m => m.id !== id)
    }));
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!newExpTitle.trim() || !newExpAmount) return;
    const newE = {
      id: 'e_' + Date.now(),
      title: newExpTitle.trim(),
      amount: Number(newExpAmount),
      paidBy: newExpPaidBy,
      date: newExpDate || getTodayStr(),
      category: newExpCategory
    };
    updateActiveTimeline(t => ({
      ...t,
      expenses: [...t.expenses, newE]
    }));
    setNewExpTitle('');
    setNewExpAmount('');
    setNewExpDate(getTodayStr());
  };

  const handleDeleteExpense = (id) => {
    updateActiveTimeline(t => ({
      ...t,
      expenses: t.expenses.filter(e => e.id !== id)
    }));
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#151B2C]/90 backdrop-blur-md border-b border-slate-800/80 pt-[max(0.75rem,env(safe-area-inset-top))] px-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))]">
        <div className="max-w-md mx-auto flex items-center justify-between pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Icons.Receipt className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h1 className="text-base font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent leading-tight truncate max-w-[170px]">
                {activeTimeline.name}
              </h1>
              <p className="text-[10px] text-emerald-400 font-medium tracking-wide flex items-center space-x-1">
                <span>{isCycleCompleted ? 'Closed Timeline' : 'Active Cycle'}</span>
                <span>•</span>
                <span>{cycleStartDate} → {cycleEndDate || 'Ongoing'}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => setActiveTab('sync')}
              className={`px-2 py-1 rounded-lg text-[10px] font-mono flex items-center space-x-1 border transition-colors ${
                tokenStatus === 'valid'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : tokenStatus === 'expired'
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              <Icons.Github className="w-3 h-3" />
              <span>{tokenStatus === 'valid' ? 'Synced' : tokenStatus === 'expired' ? 'Expired' : 'GitHub'}</span>
            </button>

            <button
              onClick={() => setActiveTab('timelines')}
              className="bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 rounded-xl p-2 text-slate-300 transition-colors flex items-center space-x-1"
              title="Timeline History"
            >
              <Icons.Calendar className="w-4 h-4 text-emerald-400" />
            </button>
          </div>
        </div>

        {/* Dynamic Nav Tabs Bar */}
        <nav className="max-w-md mx-auto flex justify-between space-x-1 overflow-x-auto no-scrollbar pb-2">
          {[
            { id: 'dashboard', label: 'Summary', icon: Icons.DollarSign },
            { id: 'members', label: 'Members', icon: Icons.Users },
            { id: 'expenses', label: 'Expenses', icon: Icons.Receipt },
            { id: 'segments', label: 'Billing Sheet', icon: Icons.Table },
            { id: 'timelines', label: 'Timelines', icon: Icons.Calendar },
            { id: 'sync', label: 'GitHub', icon: Icons.Github },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-md w-full mx-auto p-4 space-y-4 pb-[max(5rem,calc(env(safe-area-inset-bottom)+4.5rem))]">

        {/* Token Expired Warning Banner */}
        {tokenStatus === 'expired' && (
          <div className="bg-rose-950/80 border border-rose-500/60 rounded-2xl p-3.5 space-y-2 shadow-lg shadow-rose-950/50">
            <div className="flex items-start space-x-2.5">
              <Icons.AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-xs font-bold text-rose-200">GitHub Access Token Expired</h3>
                <p className="text-[11px] text-rose-300/90 leading-relaxed mt-0.5">
                  Your saved GitHub token has expired. Cloud backup is paused.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end space-x-2 pt-1 border-t border-rose-800/40">
              <button
                onClick={() => setActiveTab('sync')}
                className="bg-rose-500 hover:bg-rose-400 text-slate-950 text-[10px] font-bold px-3 py-1 rounded-lg transition-colors"
              >
                Update Token Now
              </button>
            </div>
          </div>
        )}

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-4">
            {/* Cycle Status Banner with End Cycle Action */}
            <div className={`border rounded-2xl p-4 transition-all ${
              isCycleCompleted
                ? 'bg-slate-900/90 border-slate-700/80'
                : 'bg-emerald-950/30 border-emerald-500/40'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className={`p-2 rounded-xl ${
                    isCycleCompleted ? 'bg-slate-800 text-slate-400' : 'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {isCycleCompleted ? <Icons.CheckCircle className="w-5 h-5" /> : <Icons.Clock className="w-5 h-5 animate-pulse" />}
                  </div>
                  <div>
                    <span className="text-xs font-bold block text-slate-200">
                      {isCycleCompleted ? 'Cycle Completed' : 'Cycle is Active & Running'}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      Started: {cycleStartDate} | {cycleEndDate ? `Ended: ${cycleEndDate}` : 'End Date: Open-Ended'}
                    </span>
                  </div>
                </div>

                {!isCycleCompleted ? (
                  <button
                    onClick={handleEndCycle}
                    className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 font-bold text-xs px-3 py-1.5 rounded-xl transition-all flex items-center space-x-1.5 shadow-sm"
                  >
                    <Icons.Power className="w-3.5 h-3.5" />
                    <span>End Cycle</span>
                  </button>
                ) : (
                  <button
                    onClick={handleReopenCycle}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-[10px] font-semibold px-2.5 py-1 rounded-lg"
                  >
                    Re-open
                  </button>
                )}
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-850/90 border border-slate-800 rounded-2xl p-3.5 relative overflow-hidden">
                <span className="text-[11px] text-slate-400 font-medium block">Total Mess Spend</span>
                <span className="text-xl font-bold text-white font-mono mt-0.5 block">
                  ${calculationSummary.totalMessExpenses.toFixed(2)}
                </span>
                <span className="text-[10px] text-slate-500 mt-1 block">Across {expenses.length} expense logs</span>
              </div>

              <div className="bg-slate-850/90 border border-slate-800 rounded-2xl p-3.5 relative overflow-hidden">
                <span className="text-[11px] text-slate-400 font-medium block">Kitty Fund Balance</span>
                <span className={`text-xl font-bold font-mono mt-0.5 block ${
                  calculationSummary.remainingKittyBalance >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  ${calculationSummary.remainingKittyBalance.toFixed(2)}
                </span>
                <span className="text-[10px] text-slate-500 mt-1 block">Deposits: ${calculationSummary.totalDeposits}</span>
              </div>
            </div>

            {/* Kitty Fund Summary Card */}
            <div className="bg-slate-850/90 border border-emerald-500/30 rounded-2xl p-3.5 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400">
                  <Icons.PiggyBank className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-200">Kitty Pool Breakdown</h3>
                  <p className="text-[10px] text-slate-400 font-mono">
                    Kitty Spent: ${calculationSummary.paidFromKitty.toFixed(2)} | Direct Member Out-of-pocket: ${calculationSummary.paidByMembersOutOfPocket.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* Member Net Settlement Balances */}
            <div className="bg-slate-850/90 border border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                  <Icons.Users className="w-4 h-4 text-emerald-400" />
                  <span>Member Net Balances</span>
                </h2>
                <span className="text-[10px] text-slate-500">Refund (+) / Owed (-)</span>
              </div>

              <div className="space-y-2.5">
                {calculationSummary.memberStats.map((ms) => {
                  const isRefund = ms.netBalance >= 0;
                  return (
                    <div key={ms.id} className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <span className="text-xs font-semibold text-slate-200">{ms.name}</span>
                          <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.2 rounded font-mono">
                            Joined {ms.joinDate}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5 space-x-2 font-mono">
                          <span>Deposit: ${ms.deposit}</span>
                          <span>|</span>
                          <span>Cost Share: ${ms.calculatedExpenseShare.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className={`text-sm font-bold font-mono ${isRefund ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {isRefund ? `+$${ms.netBalance.toFixed(2)}` : `-$${Math.abs(ms.netBalance).toFixed(2)}`}
                        </span>
                        <span className="block text-[9px] text-slate-500">
                          {isRefund ? 'Refund Due' : 'Needs to Pay'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Timelines & Settings Tab */}
        {activeTab === 'timelines' && (
          <div className="space-y-4">
            {/* Start New Timeline Action */}
            <div className="bg-slate-850/90 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-200">Start New Mess Cycle</h3>
                <p className="text-[10px] text-slate-400">Creates a fresh timeline and carries over existing members.</p>
              </div>
              <button
                onClick={handleCreateNewTimeline}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-md shadow-emerald-500/20 flex items-center space-x-1"
              >
                <Icons.Plus className="w-4 h-4" />
                <span>New Cycle</span>
              </button>
            </div>

            {/* Active Timeline Editor Card */}
            <div className="bg-slate-850/90 border border-emerald-500/40 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-1.5">
                  <Icons.Calendar className="w-4 h-4 text-emerald-400" />
                  <span>Current Timeline Details</span>
                </h2>
                <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-semibold ${
                  isCycleCompleted ? 'bg-slate-800 text-slate-400' : 'bg-emerald-500/20 text-emerald-400'
                }`}>
                  {isCycleCompleted ? 'CLOSED' : 'ACTIVE'}
                </span>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Timeline Title / Name</label>
                <input
                  type="text"
                  value={activeTimeline.name}
                  onChange={(e) => {
                    const val = e.target.value;
                    updateActiveTimeline(t => ({ ...t, name: val }));
                  }}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 font-semibold focus:outline-none focus:border-emerald-500/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Start Date</label>
                  <input
                    type="date"
                    value={cycleStartDate}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateActiveTimeline(t => ({ ...t, startDate: val }));
                    }}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 font-mono focus:outline-none focus:border-emerald-500/50"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">End Date (Optional)</label>
                  <input
                    type="date"
                    value={cycleEndDate}
                    placeholder="Open-Ended"
                    onChange={(e) => {
                      const val = e.target.value;
                      updateActiveTimeline(t => ({
                        ...t,
                        endDate: val,
                        status: val ? 'completed' : 'active'
                      }));
                    }}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 font-mono focus:outline-none focus:border-emerald-500/50"
                  />
                </div>
              </div>

              {!isCycleCompleted && (
                <button
                  onClick={handleEndCycle}
                  className="w-full bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/50 text-rose-300 font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg shadow-rose-950/30 mt-2"
                >
                  <Icons.Power className="w-4 h-4" />
                  <span>End Current Cycle (Set End Date to Today)</span>
                </button>
              )}
            </div>

            {/* Saved Timelines History List */}
            <div className="bg-slate-850/90 border border-slate-800 rounded-2xl p-4 space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                <Icons.Clock className="w-4 h-4 text-emerald-400" />
                <span>Saved Timeline History ({timelines.length})</span>
              </h2>

              <div className="space-y-2">
                {timelines.map((tl) => {
                  const isSelected = tl.id === activeTimelineId;
                  const totalExp = (tl.expenses || []).reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
                  const isClosed = tl.status === 'completed';

                  return (
                    <div
                      key={tl.id}
                      onClick={() => {
                        setActiveTimelineId(tl.id);
                        setActiveTab('dashboard');
                      }}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-emerald-500/10 border-emerald-500/50 shadow-sm'
                          : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold text-slate-100">{tl.name}</span>
                          {isSelected && (
                            <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded font-mono">
                              Viewing
                            </span>
                          )}
                          <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                            isClosed ? 'bg-slate-800 text-slate-400' : 'bg-emerald-500/20 text-emerald-400'
                          }`}>
                            {isClosed ? 'Closed' : 'Active'}
                          </span>
                        </div>

                        <p className="text-[10px] text-slate-400 font-mono">
                          Dates: {tl.startDate} → {tl.endDate || 'Ongoing'}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono">
                          Members: {(tl.members || []).length} | Total Spend: ${totalExp.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        {timelines.length > 1 && (
                          <button
                            onClick={(e) => handleDeleteTimeline(tl.id, e)}
                            className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                            title="Delete Timeline"
                          >
                            <Icons.Trash className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Members Tab */}
        {activeTab === 'members' && (
          <div className="space-y-4">
            <div className="bg-slate-850/90 border border-slate-800 rounded-2xl p-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center space-x-1.5">
                <Icons.Plus className="w-4 h-4 text-emerald-400" />
                <span>Add Member to Timeline ({activeTimeline.name})</span>
              </h2>

              <form onSubmit={handleAddMember} className="space-y-3">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Member Name</label>
                  <input
                    type="text"
                    placeholder="e.g. John Doe"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Joining Date</label>
                    <input
                      type="date"
                      value={newMemberJoinDate}
                      onChange={(e) => setNewMemberJoinDate(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500/50 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Initial Deposit ($)</label>
                    <input
                      type="number"
                      placeholder="150"
                      value={newMemberDeposit}
                      onChange={(e) => setNewMemberDeposit(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500/50 font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs py-2.5 rounded-xl transition-all shadow-lg shadow-emerald-500/20"
                >
                  Add Member
                </button>
              </form>
            </div>

            {/* Member Roster */}
            <div className="bg-slate-850/90 border border-slate-800 rounded-2xl p-4 space-y-2">
              <h3 className="text-xs font-bold text-slate-300 mb-2">Active Mess Members ({members.length})</h3>
              {members.map((m) => (
                <div key={m.id} className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-200">{m.name}</p>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                      Joined: {m.joinDate} | Deposit: ${m.deposit}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteMember(m.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                  >
                    <Icons.Trash className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Expenses Tab */}
        {activeTab === 'expenses' && (
          <div className="space-y-4">
            <div className="bg-slate-850/90 border border-slate-800 rounded-2xl p-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center space-x-1.5">
                <Icons.Plus className="w-4 h-4 text-emerald-400" />
                <span>Log New Mess Expense</span>
              </h2>

              <form onSubmit={handleAddExpense} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Expense Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Vegetables"
                      value={newExpTitle}
                      onChange={(e) => setNewExpTitle(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Amount ($)</label>
                    <input
                      type="number"
                      placeholder="80"
                      value={newExpAmount}
                      onChange={(e) => setNewExpAmount(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500/50 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Expense Date</label>
                    <input
                      type="date"
                      value={newExpDate}
                      onChange={(e) => setNewExpDate(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500/50 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Paid From / By</label>
                    <select
                      value={newExpPaidBy}
                      onChange={(e) => setNewExpPaidBy(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500/50"
                    >
                      <option value="kitty">Kitty Fund (Common Pool)</option>
                      {members.map(m => (
                        <option key={m.id} value={m.id}>{m.name} (Out-of-Pocket)</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Category</label>
                  <select
                    value={newExpCategory}
                    onChange={(e) => setNewExpCategory(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500/50"
                  >
                    <option value="Groceries">Groceries</option>
                    <option value="Veggies">Veggies & Fruits</option>
                    <option value="Meat">Meat & Fish</option>
                    <option value="Utilities">Gas & Utilities</option>
                    <option value="Fixed Utility">Fixed Mess Maid / Rent</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs py-2.5 rounded-xl transition-all shadow-lg shadow-emerald-500/20"
                >
                  Record Expense
                </button>
              </form>
            </div>

            {/* Expense Log List */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-300">Transaction Logs ({expenses.length})</h3>
              {calculationSummary.expenseBreakdownList.map((exp) => {
                const isKitty = exp.paidBy === 'kitty';
                const paidMember = isKitty ? null : members.find(m => m.id === exp.paidBy);
                return (
                  <div key={exp.id} className="bg-slate-850/90 border border-slate-800 rounded-2xl p-3 flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="text-xs font-semibold text-slate-200">{exp.title}</span>
                        <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.2 rounded border border-emerald-500/20 font-mono">
                          {exp.category}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                        Date: {exp.date} | Paid: <span className={isKitty ? "text-amber-400 font-bold" : "text-slate-200"}>
                          {isKitty ? 'Kitty Fund' : paidMember ? paidMember.name : 'Unknown'}
                        </span>
                      </p>
                      <p className="text-[9px] text-emerald-400/90 font-mono mt-0.5">
                        Split among {exp.activeCount} active member(s) on date (${exp.perPersonShare.toFixed(2)}/head)
                      </p>
                    </div>

                    <div className="text-right space-y-1">
                      <span className="text-sm font-bold text-slate-100 font-mono block">
                        ${exp.amount.toFixed(2)}
                      </span>
                      <button
                        onClick={() => handleDeleteExpense(exp.id)}
                        className="text-[10px] text-rose-400 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Billing Sheet Tab */}
        {activeTab === 'segments' && (
          <div className="space-y-4">
            <div className="bg-slate-850/90 border border-slate-800 rounded-2xl p-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center space-x-1.5">
                <Icons.Table className="w-4 h-4 text-emerald-400" />
                <span>Timeline Billing Breakdown ({activeTimeline.name})</span>
              </h2>
              <p className="text-[11px] text-slate-400 mb-3">
                Calculated dynamically for members active on or before each expense's date.
              </p>

              {/* Segment Table */}
              <div className="overflow-x-auto no-scrollbar border border-slate-800 rounded-xl">
                <table className="w-full text-left text-[11px] font-mono">
                  <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-2">Date / Item</th>
                      <th className="p-2">Cost</th>
                      <th className="p-2">Source</th>
                      <th className="p-2 text-right">Per Person Share</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {calculationSummary.expenseBreakdownList.map((item) => {
                      const isKitty = item.paidBy === 'kitty';
                      return (
                        <tr key={item.id} className="hover:bg-slate-800/30">
                          <td className="p-2">
                            <span className="text-slate-100 font-sans block font-semibold">{item.title}</span>
                            <span className="text-[9px] text-slate-500">{item.date}</span>
                          </td>
                          <td className="p-2">${item.amount}</td>
                          <td className="p-2">
                            <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                              isKitty ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-slate-800 text-slate-300'
                            }`}>
                              {isKitty ? 'Kitty Fund' : 'Member Paid'}
                            </span>
                          </td>
                          <td className="p-2 text-right font-bold text-emerald-400">
                            ${item.perPersonShare.toFixed(2)} ({item.activeCount} members)
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Sync Tab */}
        {activeTab === 'sync' && (
          <div className="space-y-4">
            <div className="bg-slate-850/90 border border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="flex items-center space-x-2">
                <Icons.Github className="w-5 h-5 text-emerald-400" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  GitHub Token & Cloud Sync
                </h2>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Backup or restore all saved timeline histories and expense sheets using GitHub Gists.
              </p>

              <div className="space-y-2 pt-1">
                <label className="text-[11px] text-slate-400 font-medium block">GitHub Personal Access Token (PAT)</label>
                <input
                  type="password"
                  placeholder="ghp_1234567890..."
                  value={githubToken}
                  onChange={(e) => {
                    setGithubToken(e.target.value);
                    if (tokenStatus !== 'idle') setTokenStatus('idle');
                  }}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 font-mono focus:outline-none focus:border-emerald-500/50"
                />

                <div className="flex space-x-2 pt-1">
                  <button
                    onClick={() => validateGithubToken(githubToken)}
                    disabled={tokenStatus === 'checking' || !githubToken.trim()}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs py-2 rounded-xl transition-colors font-medium border border-slate-700/60 flex items-center justify-center space-x-1"
                  >
                    <Icons.RefreshCw className={`w-3.5 h-3.5 ${tokenStatus === 'checking' ? 'animate-spin' : ''}`} />
                    <span>Verify Token</span>
                  </button>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-3 space-y-3">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Gist ID (Optional for Restore)</label>
                  <input
                    type="text"
                    placeholder="e.g. 8a3f129c5b..."
                    value={gistId}
                    onChange={(e) => setGistId(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 font-mono focus:outline-none focus:border-emerald-500/50"
                  />
                </div>

                {syncMessage.text && (
                  <div className={`p-2.5 rounded-xl text-xs ${
                    syncMessage.type === 'success'
                      ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                      : 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
                  }`}>
                    {syncMessage.text}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleBackupToGithub}
                    disabled={isSyncing}
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs py-2.5 rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-1.5"
                  >
                    <Icons.CloudUpload className="w-4 h-4" />
                    <span>Backup Data</span>
                  </button>

                  <button
                    onClick={handleRestoreFromGithub}
                    disabled={isSyncing || !gistId.trim()}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs py-2.5 rounded-xl transition-all border border-slate-700 flex items-center justify-center space-x-1.5"
                  >
                    <Icons.CloudDownload className="w-4 h-4" />
                    <span>Restore Data</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Navigation Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 bg-[#151B2C]/95 backdrop-blur-md border-t border-slate-800/80 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2">
        <div className="max-w-md mx-auto px-4 flex justify-around items-center">
          {[
            { id: 'dashboard', label: 'Summary', icon: Icons.DollarSign },
            { id: 'expenses', label: 'Expenses', icon: Icons.Receipt },
            { id: 'segments', label: 'Billing', icon: Icons.Table },
            { id: 'timelines', label: 'Timelines', icon: Icons.Calendar },
            { id: 'sync', label: 'GitHub', icon: Icons.Github },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center space-y-0.5 transition-colors ${
                  isActive ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </footer>
    </div>
  );
}
```

