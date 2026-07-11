import React, { useState, useEffect } from 'react';

// Premium SVG icon set with consistent dual-tone visual weights
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
  TrendingUp: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2" />
    </svg>
  ),
  Calendar: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  DollarSign: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Trash: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  Archive: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
    </svg>
  ),
  Sparkles: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  Loader: ({ className = "w-5 h-5" }) => (
    <svg className={`${className} animate-spin`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  ),
  ArrowRight: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  ),
  Check: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
    </svg>
  )
};

const EXPENSE_CATEGORIES = [
  { name: 'Groceries', color: 'from-emerald-400 to-emerald-600', text: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { name: 'Meat & Fish', color: 'from-rose-400 to-rose-600', text: 'text-rose-500', bg: 'bg-rose-500/10' },
  { name: 'Vegetables', color: 'from-amber-400 to-amber-600', text: 'text-amber-500', bg: 'bg-amber-500/10' },
  { name: 'Utilities & Gas', color: 'from-sky-400 to-sky-600', text: 'text-sky-500', bg: 'bg-sky-500/10' },
  { name: 'Others', color: 'from-violet-400 to-violet-600', text: 'text-violet-500', bg: 'bg-violet-500/10' }
];

export default function App() {
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

  const [activeGroupId, setActiveGroupId] = useState(() => groups[0]?.id || '');
  const [activeTab, setActiveTab] = useState('dashboard');
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
  const [aiReport, setAiReport] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  const [adviceStyle, setAdviceStyle] = useState('thrifty');

  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    localStorage.setItem('mess_groups', JSON.stringify(groups));
  }, [groups]);

  const activeGroup = groups.find(g => g.id === activeGroupId) || groups[0];

  if (!activeGroup && groups.length > 0) {
    setActiveGroupId(groups[0].id);
  }

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
    showToast('Beautiful new cycle created!');
  };

  const handleFinishGroup = (groupId) => {
    setGroups(groups.map(g => g.id === groupId ? { ...g, status: 'Finished' } : g));
    showToast('Cycle successfully archived.', 'warning');
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
    setAiReport('');
    showToast('Active members carried over!');
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
    showToast(`${newMemberName.trim()} joined the mess.`);
    setNewMemberName('');
  };

  const handleDeleteMember = (memberId) => {
    const memberName = activeGroup.members.find(m => m.id === memberId)?.name;
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
    showToast(`${memberName || 'Member'} removed.`, 'warning');
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

    setGroups(groups.map(g => g.id === activeGroupId ? { ...g, deposits: [...g.deposits, newDep] } : g));
    setDepAmount('');
    setDepNote('');
    setShowAddDeposit(false);
    showToast('Kitty deposit recorded securely!');
  };

  const handleDeleteDeposit = (depId) => {
    setGroups(groups.map(g => g.id === activeGroupId ? { ...g, deposits: g.deposits.filter(d => d.id !== depId) } : g));
    showToast('Deposit removed.', 'warning');
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

    setGroups(groups.map(g => g.id === activeGroupId ? { ...g, expenses: [...g.expenses, newExp] } : g));
    setExpTitle('');
    setExpAmount('');
    setExpCategory('Groceries');
    setShowAddExpense(false);
    showToast('New expense logged successfully!');
  };

  const handleDeleteExpense = (expId) => {
    setGroups(groups.map(g => g.id === activeGroupId ? { ...g, expenses: g.expenses.filter(e => e.id !== expId) } : g));
    showToast('Expense removed.', 'warning');
  };

  const getCalculations = (group) => {
    if (!group) return { totalDeposits: 0, totalExpenses: 0, currentFundBalance: 0, memberStats: [] };

    const totalDeposits = group.deposits.reduce((sum, d) => sum + d.amount, 0);
    const totalExpenses = group.expenses.reduce((sum, e) => sum + e.amount, 0);
    const expensesFromFund = group.expenses.filter(e => e.paidBy === 'Group Fund').reduce((sum, e) => sum + e.amount, 0);
    const currentFundBalance = totalDeposits - expensesFromFund;
    const memberCount = group.members.length;
    const perMemberExpenseShare = memberCount > 0 ? totalExpenses / memberCount : 0;

    const memberStats = group.members.map(member => {
      const directDeposits = group.deposits.filter(d => d.memberId === member.id).reduce((sum, d) => sum + d.amount, 0);
      const directExpensePayments = group.expenses.filter(e => e.paidBy === member.id).reduce((sum, e) => sum + e.amount, 0);
      const totalContribution = directDeposits + directExpensePayments;
      const netBalance = totalContribution - perMemberExpenseShare;

      return { ...member, directDeposits, directExpensePayments, totalContribution, netBalance };
    });

    return { totalDeposits, totalExpenses, currentFundBalance, perMemberExpenseShare, memberStats };
  };

  const { totalDeposits, totalExpenses, currentFundBalance, perMemberExpenseShare, memberStats } = getCalculations(activeGroup);

  const categorySummary = EXPENSE_CATEGORIES.map(cat => {
    const amount = activeGroup?.expenses.filter(e => e.category === cat.name).reduce((sum, e) => sum + e.amount, 0) || 0;
    return { ...cat, amount };
  });

  const askGeminiAdvisor = async () => {
    setAiLoading(true);
    setAiError('');
    setAiReport('');
    const apiKey = "";
    
    const dataset = {
      groupName: activeGroup.name,
      status: activeGroup.status,
      dateRange: `${activeGroup.startDate} to ${activeGroup.endDate}`,
      headCount: activeGroup.members.length,
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
      }))
    };

    const systemPrompt = `You are "Mess Mate AI", a highly sophisticated, friendly financial auditor and household routine optimizer.`;
    const userQuery = `Analyze our mess cycle dataset: ${JSON.stringify(dataset, null, 2)} with optimization style: ${adviceStyle}. Give an awesome formatting report with emoji. Outline exact shopping routines, custom meal planning routines, initial pooling suggestions, and 3 high-impact actionable points.`;

    const payload = {
      contents: [{ parts: [{ text: userQuery }] }],
      systemInstruction: { parts: [{ text: systemPrompt }] }
    };

    let delay = 1000;
    let success = false;
    let responseData = null;

    for (let attempt = 0; attempt < 5; attempt++) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (response.ok) {
          responseData = await response.json();
          success = true;
          break;
        }
      } catch (err) {}
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2;
    }

    setAiLoading(false);
    if (success && responseData) {
      const generatedText = responseData.candidates?.[0]?.content?.parts?.[0]?.text;
      if (generatedText) {
        setAiReport(generatedText);
        showToast('Gemini Audit complete!');
      } else {
        setAiError("Could not retrieve clean parsed metrics from Gemini.");
      }
    } else {
      setAiError("Struggling to reach Gemini. Please confirm connection.");
    }
  };

  const renderFormattedReport = (text) => {
    return text.split('\n').map((line, idx) => {
      if (line.startsWith('###') || line.startsWith('3.')) {
        return <h4 key={idx} className="text-sm font-extrabold text-indigo-400 mt-4 mb-2">{line.replace('###', '')}</h4>;
      }
      if (line.startsWith('##') || line.startsWith('1.') || line.startsWith('2.') || line.startsWith('4.')) {
        return <h3 key={idx} className="text-base font-black text-slate-100 border-b border-slate-800 pb-1 mt-5 mb-2">{line.replace('##', '')}</h3>;
      }
      if (line.startsWith('*') || line.startsWith('-')) {
        return <li key={idx} className="ml-4 list-disc text-slate-300 text-xs my-1">{line.substring(1).trim()}</li>;
      }
      return <p key={idx} className="text-slate-300 text-xs leading-relaxed my-1.5">{line}</p>;
    });
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-200 flex flex-col font-sans antialiased overflow-x-hidden selection:bg-indigo-500/30 selection:text-white">
      
      {toast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 bg-slate-900/90 border border-slate-800 text-white px-4 py-2.5 rounded-full shadow-2xl backdrop-blur-md animate-bounce">
          <span className={`w-2 h-2 rounded-full ${toast.type === 'success' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
          <span className="text-xs font-semibold">{toast.message}</span>
        </div>
      )}

      <header className="bg-[#0B0F19]/80 border-b border-slate-900 py-4 px-4 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
              <span className="bg-gradient-to-tr from-indigo-500 to-violet-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-500/20">
                <Icons.Sparkles className="w-4 h-4" />
              </span>
              MESS MATE <span className="text-indigo-400 font-medium text-sm">PRO</span>
            </h1>
          </div>
          {groups.length > 0 && (
            <div className="relative">
              <select
                value={activeGroupId}
                onChange={(e) => {
                  setActiveGroupId(e.target.value);
                  setAiReport('');
                }}
                className="appearance-none bg-slate-900 border border-slate-850 hover:border-slate-800 text-white text-xs font-semibold py-2 pl-3 pr-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer"
              >
                {groups.map(g => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 pb-28">

        {activeGroup && (
          <div className="relative overflow-hidden bg-gradient-to-br from-slate-900/90 to-slate-950/95 border border-slate-850 rounded-3xl p-5 mb-5 shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 z-10 relative">
              <div>
                <div className="flex items-center gap-2.5">
                  <h2 className="text-base font-bold text-white tracking-tight">{activeGroup.name}</h2>
                  <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    activeGroup.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {activeGroup.status}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                  <Icons.Calendar className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{activeGroup.startDate} to {activeGroup.endDate}</span>
                </div>
              </div>

              <div className="flex gap-2">
                {activeGroup.status === 'Active' ? (
                  <button
                    onClick={() => handleFinishGroup(activeGroup.id)}
                    className="bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-amber-400 text-xs font-semibold py-2 px-3.5 rounded-xl flex items-center gap-1.5 transition-all"
                  >
                    <Icons.Archive className="w-3.5 h-3.5" />
                    Archive Cycle
                  </button>
                ) : (
                  <button
                    onClick={() => handleCloneGroup(activeGroup)}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-2 px-3.5 rounded-xl flex items-center gap-1.5 transition-all shadow-lg shadow-indigo-600/15"
                  >
                    <Icons.Plus className="w-3.5 h-3.5" />
                    Carry Over Members
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="flex overflow-x-auto no-scrollbar bg-slate-950/80 border border-slate-900 rounded-2xl p-1 mb-6 gap-0.5 shadow-inner">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Icons.TrendingUp },
            { id: 'members', label: 'Members', icon: Icons.Users },
            { id: 'expenses', label: 'Expenses', icon: Icons.DollarSign },
            { id: 'ai-advisor', label: 'AI Advisor', icon: Icons.Sparkles, premium: true },
            { id: 'groups', label: 'Cycles', icon: Icons.Archive }
          ].map((tab) => {
            const ActiveIcon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[85px] py-2 px-2.5 text-xs font-semibold rounded-xl flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all ${
                  isActive 
                    ? 'bg-slate-900 text-white shadow-md border border-slate-800' 
                    : tab.premium 
                      ? 'text-indigo-400 hover:bg-indigo-500/5' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                }`}
              >
                <ActiveIcon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : ''}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {activeTab === 'dashboard' && activeGroup && (
          <div className="space-y-6">
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { title: 'Total Expenses', value: `$${totalExpenses.toFixed(0)}`, color: 'text-rose-400' },
                { title: 'Kitty Deposits', value: `$${totalDeposits.toFixed(0)}`, color: 'text-emerald-400' },
                { title: 'Remaining Kitty', value: `$${currentFundBalance.toFixed(0)}`, color: currentFundBalance >= 0 ? 'text-indigo-400' : 'text-rose-400' },
                { title: 'Per Head Share', value: `$${perMemberExpenseShare.toFixed(0)}`, color: 'text-slate-100' }
              ].map((card, i) => (
                <div key={i} className="bg-slate-900/40 border border-slate-900 rounded-2xl p-4 shadow-md hover:border-slate-850 transition-all">
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">{card.title}</p>
                  <p className={`text-xl font-black mt-1.5 ${card.color}`}>{card.value}</p>
                </div>
              ))}
            </div>

            <div className="bg-slate-900/20 border border-slate-900 rounded-3xl p-5 shadow-xl">
              <div className="flex justify-between items-center mb-5">
                <div>
                  <h3 className="font-bold text-white text-sm tracking-tight flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                    Balance Sheet & Ledger
                  </h3>
                  <p className="text-[10px] text-slate-500 mt-0.5">Calculated individual settlements</p>
                </div>
              </div>

              {activeGroup.members.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-xs text-slate-500 italic">No members in this cycle yet.</p>
                  <button 
                    onClick={() => setActiveTab('members')}
                    className="mt-3 text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-1.5 rounded-xl"
                  >
                    Add Members
                  </button>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {memberStats.map(m => {
                    const isOwed = m.netBalance >= 0;
                    return (
                      <div key={m.id} className="flex justify-between items-center p-3 rounded-2xl bg-slate-900/30 border border-slate-900 hover:border-slate-850 transition-all">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs ${
                            isOwed ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                          }`}>
                            {m.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-bold text-white text-xs">{m.name}</h4>
                            <p className="text-[10px] text-slate-500">Paid out: ${m.totalContribution.toFixed(0)}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-xs font-black ${isOwed ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {isOwed ? `+$${m.netBalance.toFixed(0)}` : `-$${Math.abs(m.netBalance).toFixed(0)}`}
                          </p>
                          <p className="text-[9px] text-slate-500 tracking-wide">
                            {isOwed ? 'Refund' : 'To Pay'}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="bg-slate-900/20 border border-slate-900 p-5 rounded-3xl shadow-lg">
                <h4 className="font-bold text-white text-xs mb-4 tracking-tight">Category Spend Weights</h4>
                {totalExpenses === 0 ? (
                  <p className="text-center py-6 text-slate-600 text-xs italic">No expenses logged.</p>
                ) : (
                  <div className="space-y-3">
                    {categorySummary.map(cat => {
                      const percentage = totalExpenses > 0 ? (cat.amount / totalExpenses) * 100 : 0;
                      return (
                        <div key={cat.name} className="space-y-1">
                          <div className="flex justify-between items-center text-[11px] text-slate-400">
                            <span className="font-semibold flex items-center gap-2">
                              <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-tr ${cat.color}`} />
                              {cat.name}
                            </span>
                            <span className="font-bold text-slate-300">${cat.amount.toFixed(0)} ({percentage.toFixed(0)}%)</span>
                          </div>
                          <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                            <div
                              className={`h-full rounded-full bg-gradient-to-r ${cat.color} transition-all duration-500`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="bg-slate-900/20 border border-slate-900 p-5 rounded-3xl shadow-lg">
                <h4 className="font-bold text-white text-xs mb-4 tracking-tight">Net Settlement Deviation</h4>
                {activeGroup.members.length === 0 ? (
                  <p className="text-center py-6 text-slate-600 text-xs italic">No members in cycle.</p>
                ) : (
                  <div className="space-y-3.5">
                    {memberStats.map(m => {
                      const maxAbsVal = Math.max(...memberStats.map(item => Math.abs(item.netBalance)), 1);
                      const barWidth = (Math.abs(m.netBalance) / maxAbsVal) * 100;
                      const isPositive = m.netBalance >= 0;

                      return (
                        <div key={m.id} className="text-[11px]">
                          <div className="flex justify-between items-center mb-1 text-slate-400">
                            <span>{m.name}</span>
                            <span className={`font-black ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                              {isPositive ? `+$${m.netBalance.toFixed(0)}` : `-$${Math.abs(m.netBalance).toFixed(0)}`}
                            </span>
                          </div>
                          
                          <div className="relative w-full bg-slate-950 rounded-xl h-4 overflow-hidden flex items-center border border-slate-900">
                            <div className="absolute left-1/2 top-0 bottom-0 w-[1.5px] bg-slate-800 z-10" />
                            {isPositive ? (
                              <div 
                                className="absolute left-1/2 bg-gradient-to-r from-emerald-500/40 to-emerald-500 h-full rounded-r transition-all duration-500"
                                style={{ width: `${barWidth / 2}%` }}
                              />
                            ) : (
                              <div 
                                className="absolute right-1/2 bg-gradient-to-l from-rose-500/40 to-rose-500 h-full rounded-l transition-all duration-500"
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

        {activeTab === 'members' && activeGroup && (
          <div className="space-y-5">
            
            <div className="bg-slate-900/20 border border-slate-900 rounded-3xl p-5 shadow-xl">
              <h3 className="font-bold text-white text-xs mb-3 flex items-center gap-2">
                <Icons.Users className="w-4 h-4 text-indigo-400" />
                Assemble Cycle Members
              </h3>
              
              <form onSubmit={handleAddMember} className="flex gap-2">
                <input
                  type="text"
                  placeholder="E.g. Siddharth Sharma"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  className="flex-1 bg-slate-950 rounded-xl border border-slate-900 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  required
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1 transition-all shadow-lg"
                >
                  <Icons.Plus className="w-3.5 h-3.5" /> Add
                </button>
              </form>

              <div className="mt-5 border-t border-slate-900 pt-4">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Members roster ({activeGroup.members.length})</h4>
                {activeGroup.members.length === 0 ? (
                  <p className="text-xs text-slate-600 italic">No members tracked in this cycle yet.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {activeGroup.members.map(m => (
                      <div key={m.id} className="flex justify-between items-center bg-slate-950/50 rounded-2xl p-3 border border-slate-900 hover:border-slate-850 transition-all">
                        <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                          {m.name}
                        </span>
                        <button
                          onClick={() => handleDeleteMember(m.id)}
                          className="text-rose-500/80 hover:text-rose-400 hover:bg-rose-500/5 p-1.5 rounded-lg transition-colors"
                        >
                          <Icons.Trash className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-slate-900/20 border border-slate-900 rounded-3xl p-5 shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-bold text-white text-xs flex items-center gap-2">
                    <Icons.DollarSign className="w-4 h-4 text-emerald-400" />
                    Kitty Deposits Ledger
                  </h3>
                  <p className="text-[9px] text-slate-500 mt-0.5">Pool capital for groceries beforehand</p>
                </div>
                {activeGroup.members.length > 0 && (
                  <button
                    onClick={() => {
                      setDepMemberId(activeGroup.members[0].id);
                      setShowAddDeposit(true);
                    }}
                    className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-3 py-1.5 rounded-xl border border-emerald-500/20 flex items-center gap-1 transition-all"
                  >
                    <Icons.Plus className="w-3.5 h-3.5" /> Log Deposit
                  </button>
                )}
              </div>

              {showAddDeposit && (
                <form onSubmit={handleAddDeposit} className="bg-slate-950 border border-slate-900 p-4 rounded-2xl mb-4 space-y-3.5 animate-fade-in">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Contributor</label>
                      <select 
                        value={depMemberId} 
                        onChange={(e) => setDepMemberId(e.target.value)} 
                        className="w-full bg-slate-900 border border-slate-850 p-2 text-xs text-white rounded-xl focus:outline-none"
                      >
                        {activeGroup.members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Amount ($)</label>
                      <input 
                        type="number" 
                        step="any" 
                        required 
                        value={depAmount} 
                        onChange={(e) => setDepAmount(e.target.value)} 
                        className="w-full bg-slate-900 border border-slate-850 p-2 text-xs text-white rounded-xl focus:outline-none" 
                        placeholder="E.g. 150"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => setShowAddDeposit(false)} className="bg-slate-800 text-slate-400 text-xs font-semibold px-3 py-1.5 rounded-xl">Cancel</button>
                    <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-1.5 rounded-xl shadow-md">Confirm</button>
                  </div>
                </form>
              )}

              <div className="overflow-x-auto text-xs">
                {activeGroup.deposits.length === 0 ? (
                  <p className="text-slate-600 italic text-center py-5">No pool entries recorded yet.</p>
                ) : (
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-900 text-[10px] font-black text-slate-500 uppercase tracking-wider pb-2">
                        <th className="pb-2">Member</th>
                        <th className="pb-2">Amount</th>
                        <th className="pb-2">Note</th>
                        <th className="pb-2 text-right">Delete</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-900">
                      {activeGroup.deposits.map(d => (
                        <tr key={d.id} className="hover:bg-slate-950/20">
                          <td className="py-2.5 font-bold text-slate-300">{activeGroup.members.find(m => m.id === d.memberId)?.name || 'Unknown'}</td>
                          <td className="py-2.5 font-black text-emerald-400">${d.amount}</td>
                          <td className="py-2.5 italic text-slate-500">{d.note}</td>
                          <td className="py-2.5 text-right">
                            <button onClick={() => handleDeleteDeposit(d.id)} className="text-rose-500/80 hover:text-rose-400">
                              <Icons.Trash className="w-3.5 h-3.5 inline" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'expenses' && activeGroup && (
          <div className="bg-slate-900/20 border border-slate-900 rounded-3xl p-5 shadow-xl space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-white text-xs">Expenses Logs</h3>
                <p className="text-[9px] text-slate-500 mt-0.5">Purchases and out-of-pocket receipts</p>
              </div>
              {activeGroup.members.length > 0 && (
                <button 
                  onClick={() => setShowAddExpense(true)} 
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1 shadow-lg shadow-indigo-600/15 transition-all"
                >
                  <Icons.Plus className="w-3.5 h-3.5" /> Log Purchase
                </button>
              )}
            </div>

            {showAddExpense && (
              <form onSubmit={handleAddExpense} className="bg-slate-950 border border-slate-900 p-4 rounded-2xl space-y-3.5 animate-fade-in">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Item Title</label>
                    <input type="text" required value={expTitle} onChange={(e) => setExpTitle(e.target.value)} className="w-full bg-slate-900 border border-slate-850 p-2 text-xs text-white rounded-xl focus:outline-none" placeholder="E.g. Chicken breast" />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Spent Amount ($)</label>
                    <input type="number" step="any" required value={expAmount} onChange={(e) => setExpAmount(e.target.value)} className="w-full bg-slate-900 border border-slate-850 p-2 text-xs text-white rounded-xl focus:outline-none" placeholder="E.g. 45" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Category</label>
                    <select value={expCategory} onChange={(e) => setExpCategory(e.target.value)} className="w-full bg-slate-900 border border-slate-850 p-2 text-xs text-white rounded-xl focus:outline-none bg-slate-900">
                      {EXPENSE_CATEGORIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Paid By</label>
                    <select value={expPaidBy} onChange={(e) => setExpPaidBy(e.target.value)} className="w-full bg-slate-900 border border-slate-850 p-2 text-xs text-white rounded-xl focus:outline-none bg-slate-900">
                      <option value="Group Fund">Common Fund (Kitty)</option>
                      {activeGroup.members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <button type="button" onClick={() => setShowAddExpense(false)} className="bg-slate-800 text-slate-400 text-xs font-semibold px-3 py-1.5 rounded-xl">Cancel</button>
                  <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-1.5 rounded-xl shadow-md">Record</button>
                </div>
              </form>
            )}

            <div className="overflow-x-auto text-xs">
              {activeGroup.expenses.length === 0 ? (
                <p className="text-slate-600 italic text-center py-5">No transaction items tracked yet.</p>
              ) : (
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-900 text-[10px] font-black text-slate-500 uppercase tracking-wider pb-2">
                      <th className="pb-2">Details</th>
                      <th className="pb-2">Category</th>
                      <th className="pb-2">Funding</th>
                      <th className="pb-2">Amount</th>
                      <th className="pb-2 text-right">Delete</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900">
                    {activeGroup.expenses.map(e => {
                      const categoryObj = EXPENSE_CATEGORIES.find(c => c.name === e.category);
                      return (
                        <tr key={e.id} className="hover:bg-slate-950/20">
                          <td className="py-3 font-bold text-slate-200">{e.title}</td>
                          <td className="py-3">
                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-black text-white bg-gradient-to-tr ${categoryObj?.color || 'from-slate-500 to-slate-700'}`}>
                              {e.category}
                            </span>
                          </td>
                          <td className="py-3 text-slate-400 font-semibold">
                            {e.paidBy === 'Group Fund' ? '🏦 Kitty Fund' : activeGroup.members.find(m => m.id === e.paidBy)?.name || 'Member'}
                          </td>
                          <td className="py-3 font-black text-rose-400">${e.amount}</td>
                          <td className="py-3 text-right">
                            <button onClick={() => handleDeleteExpense(expId => e.id)} className="text-rose-500/80 hover:text-rose-400">
                              <Icons.Trash className="w-3.5 h-3.5 inline" />
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
        )}

        {activeTab === 'ai-advisor' && activeGroup && (
          <div className="space-y-5">
            <div className="relative overflow-hidden bg-gradient-to-b from-indigo-950/80 to-[#0B0F19] border border-indigo-500/10 rounded-3xl p-6 shadow-2xl">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex items-center gap-2.5 mb-4">
                <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl text-indigo-400 animate-pulse">
                  <Icons.Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base tracking-wide text-white">Intelligent Gemini Advisor</h3>
                  <p className="text-[10px] text-indigo-300 uppercase tracking-widest font-bold">Automatic Group Routine & Spending Audits</p>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                Unlock actionable household strategies. Gemini reads your current expense split deviation to build tailored grocery schedules, meal prep systems, and optimum starting pool parameters.
              </p>

              <div className="mt-6 pt-5 border-t border-slate-900 flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
                <div>
                  <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1.5">savings protocol</label>
                  <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-900">
                    <button onClick={() => setAdviceStyle('thrifty')} className={`text-[10px] px-3.5 py-1.5 rounded-lg font-bold transition-all ${adviceStyle === 'thrifty' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}>Thrifty</button>
                    <button onClick={() => setAdviceStyle('balanced')} className={`text-[10px] px-3.5 py-1.5 rounded-lg font-bold transition-all ${adviceStyle === 'balanced' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}>Balanced</button>
                  </div>
                </div>

                <button 
                  onClick={askGeminiAdvisor} 
                  disabled={aiLoading} 
                  className="bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 disabled:from-indigo-800 disabled:to-indigo-900 text-white text-xs font-bold py-3 px-5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/10 cursor-pointer self-stretch sm:self-auto"
                >
                  {aiLoading ? <><Icons.Loader className="w-4 h-4" /> Crunching data...</> : <><Icons.Sparkles className="w-4 h-4" /> Formulate Strategy</>}
                </button>
              </div>
            </div>

            {aiLoading && (
              <div className="bg-slate-900/10 rounded-3xl p-8 text-center space-y-4 shadow-xl border border-slate-900 flex flex-col items-center justify-center">
                <div className="p-3.5 bg-indigo-500/15 border border-indigo-500/20 text-indigo-400 rounded-full animate-bounce">
                  <Icons.Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-extrabold text-white text-sm">Processing group matrix...</h4>
                  <p className="text-[10px] text-slate-500 mt-1 max-w-sm">Generating personalized schedule metrics & meal workflows</p>
                </div>
                <div className="w-40 h-1 bg-slate-950 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full animate-pulse w-3/4" />
                </div>
              </div>
            )}

            {aiError && <div className="bg-rose-500/10 border border-rose-500/25 text-rose-400 p-4 rounded-2xl text-xs">⚠️ {aiError}</div>}

            {aiReport && !aiLoading && (
              <div className="bg-slate-900/15 border border-slate-900 rounded-3xl p-6 shadow-2xl space-y-4 animate-fade-in">
                <div className="flex justify-between items-center border-b border-slate-900 pb-3">
                  <h4 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-ping" />
                    AUDIT REPORT METRICS
                  </h4>
                  <button
                    onClick={() => {
                      const el = document.createElement('textarea');
                      el.value = aiReport;
                      document.body.appendChild(el);
                      el.select();
                      document.execCommand('copy');
                      document.body.removeChild(el);
                      showToast('Strategy copied to clipboard!');
                    }}
                    className="text-[10px] text-indigo-400 font-bold hover:underline"
                  >
                    Copy Output
                  </button>
                </div>

                <div className="prose prose-invert max-w-none space-y-2.5">
                  {renderFormattedReport(aiReport)}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'groups' && (
          <div className="space-y-5 animate-fade-in">
            <div className="bg-slate-900/20 border border-slate-900 rounded-3xl p-5 shadow-xl">
              <h3 className="font-bold text-white text-xs mb-4 flex items-center gap-2">
                <Icons.Archive className="w-4 h-4 text-indigo-400" />
                Establish New Mess Cycle Group
              </h3>
              <form onSubmit={handleCreateGroup} className="space-y-4">
                <div>
                  <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Cycle Name</label>
                  <input 
                    type="text" 
                    required 
                    value={newGroupName} 
                    onChange={(e) => setNewGroupName(e.target.value)} 
                    className="w-full bg-slate-950 border border-slate-900 p-2.5 text-xs text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50" 
                    placeholder="E.g. August Mess Slot A" 
                  />
                </div>
                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-xl text-xs shadow-lg transition-all flex items-center justify-center gap-1.5">
                  <Icons.Plus className="w-4 h-4" /> Spawn Active Cycle
                </button>
              </form>
            </div>
          </div>
        )}

      </main>

      <footer className="bg-[#0B0F19]/80 border-t border-slate-950 py-5 text-center text-[10px] text-slate-500 mt-auto z-20 backdrop-blur-md">
        <p>© 2026 Mess Mate Pro • Powered by Gemini AI Advisor • Secured Local Vault</p>
      </footer>

    </div>
  );
}
