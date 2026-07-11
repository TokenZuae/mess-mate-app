```react
import React, { useState, useEffect } from 'react';

// Custom SVG Icons for clean, library-free rendering
const Icons = {
  Plus: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>,
  Users: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
  TrendingUp: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
  Calendar: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  DollarSign: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Trash: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
  Archive: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>,
  Sparkles: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
  Loader: () => <svg className="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
};

const EXPENSE_CATEGORIES = [
  { name: 'Groceries', color: '#10B981' }, // emerald
  { name: 'Meat & Fish', color: '#EF4444' }, // red
  { name: 'Vegetables', color: '#F59E0B' }, // amber
  { name: 'Utilities & Gas', color: '#3B82F6' }, // blue
  { name: 'Others', color: '#8B5CF6' } // purple
];

export default function App() {
  // App state
  const [groups, setGroups] = useState(() => {
    const local = localStorage.getItem('mess_groups');
    if (local) return JSON.parse(local);
    return [
      {
        id: '1',
        name: 'July Smart Mess',
        startDate: '2026-07-01',
        endDate: '2026-07-31',
        status: 'Active',
        members: [
          { id: 'm1', name: 'Rahul Sharma' },
          { id: 'm2', name: 'Amit Patel' },
          { id: 'm3', name: 'Jane Doe' },
          { id: 'm4', name: 'Siddharth' }
        ],
        deposits: [
          { id: 'd1', memberId: 'm1', amount: 150, date: '2026-07-02', note: 'Initial Kitty Deposit' },
          { id: 'd2', memberId: 'm2', amount: 150, date: '2026-07-02', note: 'Initial Kitty Deposit' },
          { id: 'd3', memberId: 'm3', amount: 120, date: '2026-07-03', note: 'Partial Deposit' },
          { id: 'd4', memberId: 'm4', amount: 150, date: '2026-07-02', note: 'Initial Kitty Deposit' }
        ],
        expenses: [
          { id: 'e1', title: 'Chicken & Fish', category: 'Meat & Fish', amount: 120, date: '2026-07-04', paidBy: 'Group Fund' },
          { id: 'e2', title: 'Weekly Rice & Oil', category: 'Groceries', amount: 180, date: '2026-07-05', paidBy: 'Group Fund' },
          { id: 'e3', title: 'Green Veggies', category: 'Vegetables', amount: 60, date: '2026-07-08', paidBy: 'm1' },
          { id: 'e4', title: 'Gas Cylinder Refill', category: 'Utilities & Gas', amount: 90, date: '2026-07-10', paidBy: 'Group Fund' }
        ]
      }
    ];
  });

  const [activeGroupId, setActiveGroupId] = useState(() => {
    return groups[0]?.id || '';
  });

  // UI state
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'members', 'expenses', 'groups', 'ai-advisor'
  
  // Modals / Input Forms
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupStart, setNewGroupStart] = useState('');
  const [newGroupEnd, setNewGroupEnd] = useState('');
  
  const [newMemberName, setNewMemberName] = useState('');
  
  const [showAddDeposit, setShowAddDeposit] = useState(false);
  const [depMemberId, setDepMemberId] = useState('');
  const [depAmount, setDepAmount] = useState('');
  const [depDate, setDepDate] = useState('');
  const [depNote, setDepNote] = useState('');

  const [showAddExpense, setShowAddExpense] = useState(false);
  const [expTitle, setExpTitle] = useState('');
  const [expAmount, setExpAmount] = useState('');
  const [expCategory, setExpCategory] = useState('Groceries');
  const [expDate, setExpDate] = useState('');
  const [expPaidBy, setExpPaidBy] = useState('Group Fund');

  // AI Advisor States
  const [aiReport, setAiReport] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  const [adviceStyle, setAdviceStyle] = useState('thrifty'); // 'thrifty' or 'balanced' or 'premium'

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('mess_groups', JSON.stringify(groups));
  }, [groups]);

  // Current Active Group Selector
  const activeGroup = groups.find(g => g.id === activeGroupId) || groups[0];

  if (!activeGroup && groups.length > 0) {
    setActiveGroupId(groups[0].id);
  }

  // Handle starting a new cycle/project with same members or new
  const handleCreateGroup = (e) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;

    const newGroup = {
      id: Date.now().toString(),
      name: newGroupName,
      startDate: newGroupStart || new Date().toISOString().split('T')[0],
      endDate: newGroupEnd || new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
      status: 'Active',
      members: [],
      deposits: [],
      expenses: []
    };

    setGroups([newGroup, ...groups]);
    setActiveGroupId(newGroup.id);
    setNewGroupName('');
    setNewGroupStart('');
    setNewGroupEnd('');
    setShowAddGroup(false);
    setActiveTab('members');
  };

  const handleFinishGroup = (groupId) => {
    setGroups(groups.map(g => {
      if (g.id === groupId) {
        return { ...g, status: 'Finished' };
      }
      return g;
    }));
  };

  const handleCloneGroup = (sourceGroup) => {
    const newGroup = {
      id: Date.now().toString(),
      name: `${sourceGroup.name} (New Cycle)`,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
      status: 'Active',
      members: sourceGroup.members.map(m => ({ ...m })),
      deposits: [],
      expenses: []
    };
    setGroups([newGroup, ...groups]);
    setActiveGroupId(newGroup.id);
    setActiveTab('dashboard');
    setAiReport(''); // Clear stale report
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;

    setGroups(groups.map(g => {
      if (g.id === activeGroupId) {
        return {
          ...g,
          members: [...g.members, { id: 'm_' + Date.now(), name: newMemberName.trim() }]
        };
      }
      return g;
    }));
    setNewMemberName('');
  };

  const handleDeleteMember = (memberId) => {
    setGroups(groups.map(g => {
      if (g.id === activeGroupId) {
        return {
          ...g,
          members: g.members.filter(m => m.id !== memberId),
          deposits: g.deposits.filter(d => d.memberId !== memberId),
          expenses: g.expenses.map(e => e.paidBy === memberId ? { ...e, paidBy: 'Group Fund' } : e)
        };
      }
      return g;
    }));
  };

  const handleAddDeposit = (e) => {
    e.preventDefault();
    if (!depMemberId || !depAmount || isNaN(depAmount)) return;

    const newDep = {
      id: 'd_' + Date.now(),
      memberId: depMemberId,
      amount: parseFloat(depAmount),
      date: depDate || new Date().toISOString().split('T')[0],
      note: depNote || 'Deposit'
    };

    setGroups(groups.map(g => {
      if (g.id === activeGroupId) {
        return { ...g, deposits: [...g.deposits, newDep] };
      }
      return g;
    }));

    setDepAmount('');
    setDepNote('');
    setShowAddDeposit(false);
  };

  const handleDeleteDeposit = (depId) => {
    setGroups(groups.map(g => {
      if (g.id === activeGroupId) {
        return { ...g, deposits: g.deposits.filter(d => d.id !== depId) };
      }
      return g;
    }));
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!expTitle.trim() || !expAmount || isNaN(expAmount)) return;

    const newExp = {
      id: 'e_' + Date.now(),
      title: expTitle,
      amount: parseFloat(expAmount),
      category: expCategory,
      date: expDate || new Date().toISOString().split('T')[0],
      paidBy: expPaidBy
    };

    setGroups(groups.map(g => {
      if (g.id === activeGroupId) {
        return { ...g, expenses: [...g.expenses, newExp] };
      }
      return g;
    }));

    setExpTitle('');
    setExpAmount('');
    setExpCategory('Groceries');
    setShowAddExpense(false);
  };

  const handleDeleteExpense = (expId) => {
    setGroups(groups.map(g => {
      if (g.id === activeGroupId) {
        return { ...g, expenses: g.expenses.filter(e => e.id !== expId) };
      }
      return g;
    }));
  };

  // CALCULATIONS ENGINE
  const getCalculations = (group) => {
    if (!group) return { totalDeposits: 0, totalExpenses: 0, currentFundBalance: 0, memberStats: [] };

    const totalDeposits = group.deposits.reduce((sum, d) => sum + d.amount, 0);
    const totalExpenses = group.expenses.reduce((sum, e) => sum + e.amount, 0);
    const expensesFromFund = group.expenses.filter(e => e.paidBy === 'Group Fund').reduce((sum, e) => sum + e.amount, 0);
    const currentFundBalance = totalDeposits - expensesFromFund;

    const memberCount = group.members.length;
    const perMemberExpenseShare = memberCount > 0 ? totalExpenses / memberCount : 0;

    const memberStats = group.members.map(member => {
      const directDeposits = group.deposits
        .filter(d => d.memberId === member.id)
        .reduce((sum, d) => sum + d.amount, 0);

      const directExpensePayments = group.expenses
        .filter(e => e.paidBy === member.id)
        .reduce((sum, e) => sum + e.amount, 0);

      const totalContribution = directDeposits + directExpensePayments;
      const netBalance = totalContribution - perMemberExpenseShare;

      return {
        ...member,
        directDeposits,
        directExpensePayments,
        totalContribution,
        netBalance
      };
    });

    return {
      totalDeposits,
      totalExpenses,
      currentFundBalance,
      perMemberExpenseShare,
      memberStats
    };
  };

  const {
    totalDeposits,
    totalExpenses,
    currentFundBalance,
    perMemberExpenseShare,
    memberStats
  } = getCalculations(activeGroup);

  // Group expenses by category for charts
  const categorySummary = EXPENSE_CATEGORIES.map(cat => {
    const amount = activeGroup?.expenses
      .filter(e => e.category === cat.name)
      .reduce((sum, e) => sum + e.amount, 0) || 0;
    return { ...cat, amount };
  });

  const maxCategoryAmount = Math.max(...categorySummary.map(c => c.amount), 1);

  // GEMINI AI INTEGRATION
  const askGeminiAdvisor = async () => {
    setAiLoading(true);
    setAiError('');
    setAiReport('');

    const apiKey = ""; // Runtime automatically provisions the API key
    
    // Package current dashboard dataset to inject into the AI context
    const dataset = {
      groupName: activeGroup.name,
      status: activeGroup.status,
      dateRange: `${activeGroup.startDate} to ${activeGroup.endDate}`,
      headCount: activeGroup.members.length,
      membersList: activeGroup.members.map(m => m.name),
      totalKittyDeposits: totalDeposits,
      totalExpensesPaid: totalExpenses,
      kittyRemainingBalance: currentFundBalance,
      individualShareNeeded: perMemberExpenseShare,
      categoryExpenses: categorySummary.map(c => ({ name: c.name, amount: c.amount })),
      memberBreakdown: memberStats.map(m => ({
        name: m.name,
        kittyDeposited: m.directDeposits,
        directOutofPocketSpent: m.directExpensePayments,
        netRefundOrDebt: m.netBalance
      })),
      recentLogs: activeGroup.expenses.slice(-5).map(e => `${e.title} ($${e.amount}) categorized as ${e.category}`)
    };

    const systemPrompt = `You are "Mess Mate AI", a world-class financial auditor, meal-planning tactician, and cooperative group-living advisor. Your job is to analyze group eating/mess spending patterns and draft a highly actionable custom routine and budget optimization strategy. Make your suggestions realistic, encouraging, and structured.`;

    const userQuery = `
      Please analyze our group's mess cycle and build a personalized savings routine.
      Our budget target is "${adviceStyle === 'thrifty' ? 'Ultra Thrifty (Maximum Savings)' : adviceStyle === 'premium' ? 'Comfort Priority (Healthy & Premium Quality Balanced)' : 'Standard Balanced (Optimum Value)'}".
      
      Here is our active cycle dataset:
      ${JSON.stringify(dataset, null, 2)}

      Please structure your response with these exact sections, formatted cleanly with headers:
      1. **EXECUTIVE FINANCIAL HEALTH REPORT**: Analyze our high spenders vs low spenders, common kitty status (is it enough or running dry?), and category distribution.
      2. **THE ${adviceStyle.toUpperCase()} MEAL & SHOPPING ROUTINE**: Based on our high categories (e.g. Groceries, Meat, Vegetables), design a weekly schedule/routine of *when* to buy, *how* to buy (bulk vs fresh), and an optimized meal prep template.
      3. **COOPERATIVE KITTY ADVICE**: Suggest the perfect "Initial Deposit" amount each person should put into the kitty at the start of the next cycle to prevent out-of-pocket anomalies, based on these statistics.
      4. **3 ACTIONABLE CRITICAL SAVINGS TASKS**: Highlight exactly 3 specific things we can cut back or shift right now to optimize this.
    `;

    const payload = {
      contents: [{ parts: [{ text: userQuery }] }],
      systemInstruction: { parts: [{ text: systemPrompt }] }
    };

    // Exponential Backoff API execution
    let delay = 1000;
    let success = false;
    let responseData = null;

    for (let attempt = 0; attempt < 5; attempt++) {
      try {
        const response = await fetch(`https://genergenerativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        
        if (response.ok) {
          responseData = await response.json();
          success = true;
          break;
        }
      } catch (err) {
        // Retrying silently
      }
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2;
    }

    setAiLoading(false);

    if (success && responseData) {
      const generatedText = responseData.candidates?.[0]?.content?.parts?.[0]?.text;
      if (generatedText) {
        setAiReport(generatedText);
      } else {
        setAiError("AI successfully returned, but could not parse the output template. Try regenerating.");
      }
    } else {
      setAiError("Unable to reach the Gemini AI server after 5 attempts. Verify your connection or try again.");
    }
  };

  // Safe markdown/text styling formatter
  const renderFormattedReport = (text) => {
    return text.split('\n').map((line, idx) => {
      if (line.startsWith('###') || line.startsWith('3.')) {
        return <h4 key={idx} className="text-base font-extrabold text-emerald-800 mt-5 mb-2">{line.replace('###', '')}</h4>;
      }
      if (line.startsWith('##') || line.startsWith('1.') || line.startsWith('2.') || line.startsWith('4.')) {
        return <h3 key={idx} className="text-lg font-black text-slate-800 border-b border-slate-100 pb-1 mt-6 mb-3">{line.replace('##', '')}</h3>;
      }
      if (line.startsWith('*') || line.startsWith('-')) {
        return <li key={idx} className="ml-4 list-disc text-slate-700 text-sm my-1">{line.substring(1).trim()}</li>;
      }
      return <p key={idx} className="text-slate-600 text-sm leading-relaxed my-2">{line}</p>;
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans antialiased">
      
      {/* Header Bar */}
      <header className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white py-4 px-4 sticky top-0 z-30 shadow-md">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              <span className="bg-white/20 p-1.5 rounded-lg">🍽️</span>
              Mess Mate Pro
            </h1>
            <p className="text-xs text-emerald-100 mt-0.5">Cooperative Living Expense Manager</p>
          </div>
          
          <div className="flex items-center gap-2">
            <select
              value={activeGroupId}
              onChange={(e) => {
                setActiveGroupId(e.target.value);
                setAiReport(''); // Clear report for fresh start on new group
              }}
              className="bg-emerald-800/60 text-white text-xs font-semibold py-1.5 px-3 rounded-lg border border-emerald-500/30 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            >
              {groups.map(g => (
                <option key={g.id} value={g.id} className="text-slate-900 bg-white">
                  {g.name} ({g.status})
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 pb-24">

        {/* Group Period Banner */}
        {activeGroup && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 mb-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-800">{activeGroup.name}</h2>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  activeGroup.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                }`}>
                  {activeGroup.status}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                <Icons.Calendar />
                <span>{activeGroup.startDate} to {activeGroup.endDate}</span>
              </div>
            </div>

            <div className="flex gap-2">
              {activeGroup.status === 'Active' ? (
                <button
                  onClick={() => handleFinishGroup(activeGroup.id)}
                  className="bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 text-xs font-bold py-2 px-3 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Icons.Archive />
                  Finish & Archive Cycle
                </button>
              ) : (
                <button
                  onClick={() => handleCloneGroup(activeGroup)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 px-3 rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Icons.Plus />
                  Start New Cycle with Same Members
                </button>
              )}
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap bg-white rounded-xl shadow-sm p-1.5 border border-slate-100 mb-5 gap-1">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 text-xs md:text-sm font-semibold rounded-lg transition-all ${
              activeTab === 'dashboard' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Icons.TrendingUp />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('members')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 text-xs md:text-sm font-semibold rounded-lg transition-all ${
              activeTab === 'members' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Icons.Users />
            Members & Kitty
          </button>
          <button
            onClick={() => setActiveTab('expenses')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 text-xs md:text-sm font-semibold rounded-lg transition-all ${
              activeTab === 'expenses' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Icons.DollarSign />
            Expenses
          </button>
          <button
            onClick={() => setActiveTab('ai-advisor')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 text-xs md:text-sm font-semibold rounded-lg transition-all ${
              activeTab === 'ai-advisor' ? 'bg-emerald-600 text-white shadow-sm' : 'text-indigo-600 bg-indigo-50/50 hover:bg-indigo-50'
            }`}
          >
            <Icons.Sparkles />
            AI Advisor
          </button>
          <button
            onClick={() => setActiveTab('groups')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 text-xs md:text-sm font-semibold rounded-lg transition-all ${
              activeTab === 'groups' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Icons.Plus />
            New / Switch
          </button>
        </div>

        {/* Tab 1: Dashboard View */}
        {activeTab === 'dashboard' && activeGroup && (
          <div className="space-y-6">
            
            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Total Expenses</p>
                <p className="text-2xl font-black text-rose-600 mt-1">${totalExpenses.toFixed(1)}</p>
                <span className="text-[10px] text-slate-400">All direct & fund purchases</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Kitty Deposits</p>
                <p className="text-2xl font-black text-emerald-600 mt-1">${totalDeposits.toFixed(1)}</p>
                <span className="text-[10px] text-slate-400">Total fund pooling</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Remaining Kitty</p>
                <p className={`text-2xl font-black mt-1 ${currentFundBalance >= 0 ? 'text-indigo-600' : 'text-rose-600'}`}>
                  ${currentFundBalance.toFixed(1)}
                </p>
                <span className="text-[10px] text-slate-400">Cash in common pool</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Share per Head</p>
                <p className="text-2xl font-black text-slate-700 mt-1">${perMemberExpenseShare.toFixed(1)}</p>
                <span className="text-[10px] text-slate-400">Split equally ({activeGroup.members.length} heads)</span>
              </div>
            </div>

            {/* Split Settlement Dashboard */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
              <h3 className="font-bold text-slate-800 text-base mb-4 flex items-center justify-between">
                <span>⚖️ Expense Splitting & Settlements</span>
                <span className="text-xs font-normal text-slate-500">Auto-balanced matching</span>
              </h3>

              {activeGroup.members.length === 0 ? (
                <div className="text-center py-6 text-slate-400">
                  <p>No members in this group yet.</p>
                  <button 
                    onClick={() => setActiveTab('members')}
                    className="mt-3 text-xs bg-emerald-500 text-white font-semibold px-4 py-1.5 rounded-lg"
                  >
                    Add Members Now
                  </button>
                </div>
              ) : (
                <div className="space-y-3.5">
                  {memberStats.map(m => {
                    const isOwed = m.netBalance >= 0;
                    return (
                      <div key={m.id} className="flex items-center justify-between p-3.5 rounded-lg bg-slate-50 border border-slate-100">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm text-white ${
                            isOwed ? 'bg-emerald-500' : 'bg-rose-400'
                          }`}>
                            {m.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-800 text-sm">{m.name}</h4>
                            <p className="text-[11px] text-slate-500">
                              Contributed: ${m.totalContribution.toFixed(1)} | Share: ${perMemberExpenseShare.toFixed(1)}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className={`text-sm font-extrabold ${isOwed ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {isOwed ? `+$${m.netBalance.toFixed(1)}` : `-$${Math.abs(m.netBalance).toFixed(1)}`}
                          </p>
                          <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wide">
                            {isOwed ? 'Gets Refund' : 'Needs To Pay'}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Visual Charts Component */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Expense category breakdown */}
              <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                <h4 className="font-bold text-slate-800 text-sm mb-4">🛒 Expenses Breakdown by Category</h4>
                {totalExpenses === 0 ? (
                  <div className="text-center py-8 text-slate-400 text-xs">No expenses logged yet</div>
                ) : (
                  <div className="space-y-4">
                    {categorySummary.map(cat => {
                      const percentage = totalExpenses > 0 ? (cat.amount / totalExpenses) * 100 : 0;
                      return (
                        <div key={cat.name}>
                          <div className="flex justify-between items-center text-xs text-slate-600 mb-1">
                            <span className="font-medium flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                              {cat.name}
                            </span>
                            <span className="font-bold">${cat.amount.toFixed(1)} ({percentage.toFixed(0)}%)</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2">
                            <div
                              className="h-2 rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%`, backgroundColor: cat.color }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Net Balance visual graph */}
              <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                <h4 className="font-bold text-slate-800 text-sm mb-4">📊 Member Contribution vs Share Difference</h4>
                {activeGroup.members.length === 0 ? (
                  <div className="text-center py-8 text-slate-400 text-xs">No data to display</div>
                ) : (
                  <div className="space-y-4">
                    {memberStats.map(m => {
                      const maxAbsVal = Math.max(...memberStats.map(item => Math.abs(item.netBalance)), 1);
                      const barWidth = (Math.abs(m.netBalance) / maxAbsVal) * 100;
                      const isPositive = m.netBalance >= 0;

                      return (
                        <div key={m.id} className="text-xs">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium text-slate-600">{m.name}</span>
                            <span className={`font-bold ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                              {isPositive ? `Refund: $${m.netBalance.toFixed(1)}` : `Owes: $${Math.abs(m.netBalance).toFixed(1)}`}
                            </span>
                          </div>
                          
                          <div className="relative w-full bg-slate-50 border border-slate-100 rounded-lg h-6 overflow-hidden flex items-center">
                            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-300 z-10" />
                            {isPositive ? (
                              <div 
                                className="absolute left-1/2 bg-emerald-400 h-full transition-all duration-500"
                                style={{ width: `${barWidth / 2}%` }}
                              />
                            ) : (
                              <div 
                                className="absolute right-1/2 bg-rose-400 h-full transition-all duration-500"
                                style={{ width: `${barWidth / 2}%` }}
                              />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

        {/* Tab 2: Members & Deposits */}
        {activeTab === 'members' && activeGroup && (
          <div className="space-y-5">
            
            {/* Member Addition */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
              <h3 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2">
                <Icons.Users />
                Manage Mess Members
              </h3>
              
              <form onSubmit={handleAddMember} className="flex gap-2">
                <input
                  type="text"
                  placeholder="E.g., Rahul Sharma"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-1 transition-colors shadow-sm"
                >
                  <Icons.Plus /> Add
                </button>
              </form>

              {/* Members List */}
              <div className="mt-4 border-t border-slate-100 pt-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Current Members ({activeGroup.members.length})</h4>
                {activeGroup.members.length === 0 ? (
                  <p className="text-xs text-slate-400 italic py-2">No members added yet. Start by typing a name above.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {activeGroup.members.map(m => (
                      <div key={m.id} className="flex justify-between items-center bg-slate-50 rounded-lg p-2.5 border border-slate-100">
                        <span className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          {m.name}
                        </span>
                        <button
                          onClick={() => handleDeleteMember(m.id)}
                          className="text-rose-500 hover:bg-rose-50 p-1.5 rounded-lg transition-colors"
                          title="Delete Member"
                        >
                          <Icons.Trash />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Deposits Management */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                  <Icons.DollarSign />
                  Kitty Deposits
                </h3>
                {activeGroup.members.length > 0 && (
                  <button
                    onClick={() => {
                      setDepMemberId(activeGroup.members[0]?.id || '');
                      setShowAddDeposit(true);
                    }}
                    className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                  >
                    <Icons.Plus /> Add Deposit
                  </button>
                )}
              </div>

              {showAddDeposit && (
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-4">
                  <h4 className="text-xs font-bold text-slate-700 mb-3">Record Deposit</h4>
                  <form onSubmit={handleAddDeposit} className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Select Member</label>
                        <select
                          value={depMemberId}
                          onChange={(e) => setDepMemberId(e.target.value)}
                          className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          {activeGroup.members.map(m => (
                            <option key={m.id} value={m.id}>{m.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Deposit Amount ($)</label>
                        <input
                          type="number"
                          step="any"
                          required
                          value={depAmount}
                          onChange={(e) => setDepAmount(e.target.value)}
                          className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="e.g. 150"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Deposit Date</label>
                        <input
                          type="date"
                          value={depDate}
                          onChange={(e) => setDepDate(e.target.value)}
                          className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Memo / Note</label>
                        <input
                          type="text"
                          value={depNote}
                          onChange={(e) => setDepNote(e.target.value)}
                          className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="e.g. Weekly Contribution"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                      <button
                        type="button"
                        onClick={() => setShowAddDeposit(false)}
                        className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-1.5 rounded-lg"
                      >
                        Save Deposit
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Deposits List */}
              <div className="overflow-x-auto">
                {activeGroup.deposits.length === 0 ? (
                  <p className="text-xs text-slate-400 italic py-4 text-center">No deposit entries found.</p>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 text-[10px] uppercase tracking-wider font-bold">
                        <th className="pb-2">Member</th>
                        <th className="pb-2">Amount</th>
                        <th className="pb-2">Date</th>
                        <th className="pb-2">Note</th>
                        <th className="pb-2 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 text-xs">
                      {activeGroup.deposits.map(d => {
                        const m = activeGroup.members.find(member => member.id === d.memberId);
                        return (
                          <tr key={d.id} className="hover:bg-slate-50/50">
                            <td className="py-2.5 font-semibold text-slate-700">{m ? m.name : 'Unknown Member'}</td>
                            <td className="py-2.5 font-bold text-emerald-600">${d.amount.toFixed(1)}</td>
                            <td className="py-2.5 text-slate-500">{d.date}</td>
                            <td className="py-2.5 text-slate-500 italic">{d.note}</td>
                            <td className="py-2.5 text-right">
                              <button
                                onClick={() => handleDeleteDeposit(d.id)}
                                className="text-rose-500 hover:bg-rose-50 p-1 rounded-md transition-colors inline-block"
                              >
                                <Icons.Trash />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

          </div>
        )}

        {/* Tab 3: Expenses Management */}
        {activeTab === 'expenses' && activeGroup && (
          <div className="space-y-5">
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                  <Icons.TrendingUp />
                  Expense Logs
                </h3>
                {activeGroup.members.length > 0 && (
                  <button
                    onClick={() => setShowAddExpense(true)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all shadow-sm"
                  >
                    <Icons.Plus /> Log Expense
                  </button>
                )}
              </div>

              {showAddExpense && (
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-4">
                  <h4 className="text-xs font-bold text-slate-700 mb-3">Record New Group Expense</h4>
                  <form onSubmit={handleAddExpense} className="space-y-3">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">What did you buy? / Title</label>
                        <input
                          type="text"
                          required
                          value={expTitle}
                          onChange={(e) => setExpTitle(e.target.value)}
                          className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="e.g. Meat & Vegetables"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Amount ($)</label>
                        <input
                          type="number"
                          step="any"
                          required
                          value={expAmount}
                          onChange={(e) => setExpAmount(e.target.value)}
                          className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="e.g. 45.50"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Category</label>
                        <select
                          value={expCategory}
                          onChange={(e) => setExpCategory(e.target.value)}
                          className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          {EXPENSE_CATEGORIES.map(cat => (
                            <option key={cat.name} value={cat.name}>{cat.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Expense Date</label>
                        <input
                          type="date"
                          value={expDate}
                          onChange={(e) => setExpDate(e.target.value)}
                          className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Paid By</label>
                        <select
                          value={expPaidBy}
                          onChange={(e) => setExpPaidBy(e.target.value)}
                          className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          <option value="Group Fund">Common Fund (Kitty)</option>
                          {activeGroup.members.map(m => (
                            <option key={m.id} value={m.id}>{m.name} (Direct Personal Pay)</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                      <button
                        type="button"
                        onClick={() => setShowAddExpense(false)}
                        className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-1.5 rounded-lg"
                      >
                        Save Expense
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Expenses List */}
              <div className="overflow-x-auto">
                {activeGroup.expenses.length === 0 ? (
                  <p className="text-xs text-slate-400 italic py-4 text-center">No expenses logged yet for this group.</p>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 text-[10px] uppercase tracking-wider font-bold">
                        <th className="pb-2">Date</th>
                        <th className="pb-2">Details</th>
                        <th className="pb-2">Category</th>
                        <th className="pb-2">Paid By</th>
                        <th className="pb-2">Amount</th>
                        <th className="pb-2 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 text-xs">
                      {activeGroup.expenses.map(e => {
                        const paidByLabel = e.paidBy === 'Group Fund' 
                          ? '🏦 Common Kitty' 
                          : activeGroup.members.find(m => m.id === e.paidBy)?.name || 'Direct Person';
                        
                        const catColor = EXPENSE_CATEGORIES.find(cat => cat.name === e.category)?.color || '#94a3b8';

                        return (
                          <tr key={e.id} className="hover:bg-slate-50/50">
                            <td className="py-2.5 text-slate-500 whitespace-nowrap">{e.date}</td>
                            <td className="py-2.5 font-semibold text-slate-700">
                              <div>{e.title}</div>
                            </td>
                            <td className="py-2.5">
                              <span 
                                className="inline-block px-2 py-0.5 rounded text-[10px] font-bold text-white whitespace-nowrap"
                                style={{ backgroundColor: catColor }}
                              >
                                {e.category}
                              </span>
                            </td>
                            <td className="py-2.5 text-slate-600 font-medium">{paidByLabel}</td>
                            <td className="py-2.5 font-bold text-rose-600">${e.amount.toFixed(1)}</td>
                            <td className="py-2.5 text-right">
                              <button
                                onClick={() => handleDeleteExpense(e.id)}
                                className="text-rose-500 hover:bg-rose-50 p-1 rounded-md transition-colors inline-block"
                              >
                                <Icons.Trash />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

          </div>
        )}

        {/* Tab 4: AI Financial Advisor (New Core Feature) */}
        {activeTab === 'ai-advisor' && activeGroup && (
          <div className="space-y-5">
            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl shadow-xl p-6 border border-slate-800">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="p-2 bg-indigo-500/20 rounded-xl text-indigo-400">
                  <Icons.Sparkles />
                </div>
                <div>
                  <h3 className="font-extrabold text-base tracking-wide">Gemini Intelligent Mess Advisor</h3>
                  <p className="text-[11px] text-indigo-300">Advanced spend-auditing & customized domestic routines</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                Our embedded Gemini AI acts as a smart kitchen warden. It instantly parses your whole group structure, category totals, individual splits, and fund velocity to output tailored shopping and kitchen operations routines.
              </p>

              {/* Configurations for advice */}
              <div className="mt-5 pt-4 border-t border-slate-800 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Target Savings Protocol</label>
                  <div className="flex gap-1 bg-slate-950 p-1 rounded-xl">
                    <button
                      onClick={() => setAdviceStyle('thrifty')}
                      className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all ${
                        adviceStyle === 'thrifty' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Thrifty (Extreme Savings)
                    </button>
                    <button
                      onClick={() => setAdviceStyle('balanced')}
                      className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all ${
                        adviceStyle === 'balanced' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Standard Value
                    </button>
                    <button
                      onClick={() => setAdviceStyle('premium')}
                      className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all ${
                        adviceStyle === 'premium' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Premium Diet
                    </button>
                  </div>
                </div>

                <button
                  onClick={askGeminiAdvisor}
                  disabled={aiLoading}
                  className="w-full md:w-auto bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-800 text-white text-xs font-black py-3 px-5 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-indigo-500/10 transition-all cursor-pointer self-stretch md:self-auto"
                >
                  {aiLoading ? (
                    <>
                      <Icons.Loader /> Analyzing dataset...
                    </>
                  ) : (
                    <>
                      <Icons.Sparkles /> Audit & Build Custom Routine
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Response Section */}
            {aiLoading && (
              <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm text-center space-y-3">
                <div className="inline-flex p-3 bg-indigo-50 text-indigo-600 rounded-full animate-bounce">
                  <Icons.Sparkles />
                </div>
                <h4 className="font-bold text-slate-800 text-sm">Processing cycle data...</h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Gemini is crunching your food category costs, calculating member split variations, and drafting a custom meal & shopping routine. This will take just a moment.
                </p>
                <div className="w-48 h-1.5 bg-slate-100 rounded-full mx-auto overflow-hidden">
                  <div className="h-full bg-indigo-600 animate-pulse w-2/3 rounded-full" />
                </div>
              </div>
            )}

            {aiError && (
              <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 text-xs text-rose-700 flex items-center gap-2">
                <span className="font-bold">⚠️ Error:</span>
                <span>{aiError}</span>
              </div>
            )}

            {aiReport && !aiLoading && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-4 animate-fade-in">
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <h4 className="text-sm font-black text-slate-800 flex items-center gap-1.5">
                    🤖 Optimized Group Strategy Report
                  </h4>
                  <button
                    onClick={() => {
                      const textToCopy = aiReport;
                      const tempElement = document.createElement('textarea');
                      tempElement.value = textToCopy;
                      document.body.appendChild(tempElement);
                      tempElement.select();
                      document.execCommand('copy');
                      document.body.removeChild(tempElement);
                    }}
                    className="text-[11px] text-indigo-600 font-bold hover:underline"
                  >
                    Copy Strategy text
                  </button>
                </div>

                <div className="prose prose-slate max-w-none">
                  {renderFormattedReport(aiReport)}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 text-[10px] text-slate-400 italic text-center">
                  Advisor suggestions are derived using active transaction weights. Optimize responsibly!
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Groups / Cycles Management */}
        {activeTab === 'groups' && (
          <div className="space-y-5">
            
            {/* Create New Group/Slot */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
              <h3 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2">
                <Icons.Archive />
                Create New Mess Cycle or Meal Group
              </h3>

              <form onSubmit={handleCreateGroup} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Group / Slot Title</label>
                  <input
                    type="text"
                    required
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="e.g. August Mess Batch A"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Custom Start Date</label>
                    <input
                      type="date"
                      value={newGroupStart}
                      onChange={(e) => setNewGroupStart(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Custom End Date</label>
                    <input
                      type="date"
                      value={newGroupEnd}
                      onChange={(e) => setNewGroupEnd(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg text-sm flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <Icons.Plus /> Start New Project Slot
                </button>
              </form>
            </div>

            {/* Existing Groups List */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
              <h3 className="font-bold text-slate-800 text-sm mb-4">All Active & Historic Groups</h3>
              <div className="space-y-3">
                {groups.map(g => {
                  const stats = getCalculations(g);
                  return (
                    <div 
                      key={g.id} 
                      onClick={() => {
                        setActiveGroupId(g.id);
                        setAiReport(''); // Clear report on change
                      }}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        g.id === activeGroupId 
                          ? 'border-emerald-500 bg-emerald-50/30' 
                          : 'border-slate-100 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm">{g.name}</h4>
                          <p className="text-xs text-slate-500 mt-1">
                            {g.startDate} to {g.endDate}
                          </p>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          g.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {g.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-100 text-center">
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Members</p>
                          <p className="text-sm font-semibold text-slate-700">{g.members.length}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Spent</p>
                          <p className="text-sm font-semibold text-rose-600">${stats.totalExpenses.toFixed(1)}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Fund Balance</p>
                          <p className="text-sm font-semibold text-indigo-600">${stats.currentFundBalance.toFixed(1)}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

      </main>

      {/* Persistent Bottom Bar for mobile devices */}
      <footer className="bg-white border-t border-slate-100 text-center py-4 text-xs text-slate-400 mt-auto z-20">
        <div className="max-w-4xl mx-auto px-4">
          <p>© 2026 Mess Mate Pro • Powered by Gemini AI Advisor • Data saved locally.</p>
        </div>
      </footer>

    </div>
  );
}

```
