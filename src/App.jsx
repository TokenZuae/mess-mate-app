import React, { useState, useEffect } from 'react';

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
  { name: 'Groceries', color: '#10B981' },
  { name: 'Meat & Fish', color: '#EF4444' },
  { name: 'Vegetables', color: '#F59E0B' },
  { name: 'Utilities & Gas', color: '#3B82F6' },
  { name: 'Others', color: '#8B5CF6' }
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
  };

  const handleFinishGroup = (groupId) => {
    setGroups(groups.map(g => g.id === groupId ? { ...g, status: 'Finished' } : g));
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

    setGroups(groups.map(g => g.id === activeGroupId ? { ...g, deposits: [...g.deposits, newDep] } : g));
    setDepAmount('');
    setDepNote('');
    setShowAddDeposit(false);
  };

  const handleDeleteDeposit = (depId) => {
    setGroups(groups.map(g => g.id === activeGroupId ? { ...g, deposits: g.deposits.filter(d => d.id !== depId) } : g));
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
  };

  const handleDeleteExpense = (expId) => {
    setGroups(groups.map(g => g.id === activeGroupId ? { ...g, expenses: g.expenses.filter(e => e.id !== expId) } : g));
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

    const systemPrompt = `You are "Mess Mate AI", a financial auditor and advisor. Analyze spending patterns and help plan cooperative group routines and optimize budgets.`;
    const userQuery = `Analyze our mess cycle dataset: ${JSON.stringify(dataset, null, 2)} with strategy: ${adviceStyle}. Provide an Executive Summary, shopping routine suggestions, and 3 actionable tasks.`;

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
      if (generatedText) setAiReport(generatedText);
      else setAiError("Could not parse AI output.");
    } else {
      setAiError("Failed to reach Gemini AI.");
    }
  };

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
      <header className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white py-4 px-4 sticky top-0 z-30 shadow-md">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              <span className="bg-white/20 p-1.5 rounded-lg">🍽️</span> Mess Mate Pro
            </h1>
            <p className="text-xs text-emerald-100 mt-0.5">Cooperative Living Expense Manager</p>
          </div>
          {groups.length > 0 && (
            <select
              value={activeGroupId}
              onChange={(e) => {
                setActiveGroupId(e.target.value);
                setAiReport('');
              }}
              className="bg-emerald-800/60 text-white text-xs font-semibold py-1.5 px-3 rounded-lg border border-emerald-500/30 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            >
              {groups.map(g => (
                <option key={g.id} value={g.id} className="text-slate-900 bg-white">
                  {g.name} ({g.status})
                </option>
              ))}
            </select>
          )}
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 pb-24">
        {activeGroup && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 mb-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-800">{activeGroup.name}</h2>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${activeGroup.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
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
                  <Icons.Archive /> Finish Cycle
                </button>
              ) : (
                <button
                  onClick={() => handleCloneGroup(activeGroup)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 px-3 rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Icons.Plus /> Start New Cycle
                </button>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-wrap bg-white rounded-xl shadow-sm p-1.5 border border-slate-100 mb-5 gap-1">
          <button onClick={() => setActiveTab('dashboard')} className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 text-xs md:text-sm font-semibold rounded-lg transition-all ${activeTab === 'dashboard' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}><Icons.TrendingUp /> Dashboard</button>
          <button onClick={() => setActiveTab('members')} className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 text-xs md:text-sm font-semibold rounded-lg transition-all ${activeTab === 'members' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}><Icons.Users /> Members & Kitty</button>
          <button onClick={() => setActiveTab('expenses')} className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 text-xs md:text-sm font-semibold rounded-lg transition-all ${activeTab === 'expenses' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}><Icons.DollarSign /> Expenses</button>
          <button onClick={() => setActiveTab('ai-advisor')} className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 text-xs md:text-sm font-semibold rounded-lg transition-all ${activeTab === 'ai-advisor' ? 'bg-emerald-600 text-white shadow-sm' : 'text-indigo-600 bg-indigo-50/50 hover:bg-indigo-50'}`}><Icons.Sparkles /> AI Advisor</button>
          <button onClick={() => setActiveTab('groups')} className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 text-xs md:text-sm font-semibold rounded-lg transition-all ${activeTab === 'groups' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}><Icons.Plus /> New / Switch</button>
        </div>

        {activeTab === 'dashboard' && activeGroup && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Total Expenses</p>
                <p className="text-2xl font-black text-rose-600 mt-1">${totalExpenses.toFixed(1)}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Kitty Deposits</p>
                <p className="text-2xl font-black text-emerald-600 mt-1">${totalDeposits.toFixed(1)}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Remaining Kitty</p>
                <p className={`text-2xl font-black mt-1 ${currentFundBalance >= 0 ? 'text-indigo-600' : 'text-rose-600'}`}>${currentFundBalance.toFixed(1)}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Per Head Share</p>
                <p className="text-2xl font-black text-slate-700 mt-1">${perMemberExpenseShare.toFixed(1)}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
              <h3 className="font-bold text-slate-800 text-base mb-4 flex justify-between items-center">
                <span>⚖️ Splits & Balance Ledger</span>
              </h3>
              {activeGroup.members.length === 0 ? (
                <p className="text-slate-400 text-center py-4 text-xs">No members in this cycle yet.</p>
              ) : (
                <div className="space-y-3">
                  {memberStats.map(m => {
                    const isOwed = m.netBalance >= 0;
                    return (
                      <div key={m.id} className="flex justify-between items-center p-3 rounded-lg bg-slate-50 border border-slate-100">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm text-white ${isOwed ? 'bg-emerald-500' : 'bg-rose-400'}`}>
                            {m.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-800 text-sm">{m.name}</h4>
                            <p className="text-[11px] text-slate-500">Paid out: ${m.totalContribution.toFixed(1)}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm font-extrabold ${isOwed ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {isOwed ? `+$${m.netBalance.toFixed(1)}` : `-$${Math.abs(m.netBalance).toFixed(1)}`}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'members' && activeGroup && (
          <div className="space-y-5">
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
              <h3 className="font-bold text-slate-800 text-sm mb-4">Add Cycle Members</h3>
              <form onSubmit={handleAddMember} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Rahul Sharma"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none"
                  required
                />
                <button type="submit" className="bg-emerald-600 text-white font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-1 shadow-sm"><Icons.Plus /> Add</button>
              </form>
              <div className="mt-4 border-t border-slate-100 pt-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {activeGroup.members.map(m => (
                    <div key={m.id} className="flex justify-between items-center bg-slate-50 rounded-lg p-2.5 border border-slate-100">
                      <span className="text-sm font-semibold text-slate-700">{m.name}</span>
                      <button onClick={() => handleDeleteMember(m.id)} className="text-rose-500"><Icons.Trash /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-800 text-sm">Kitty Deposits</h3>
                {activeGroup.members.length > 0 && (
                  <button onClick={() => { setDepMemberId(activeGroup.members[0].id); setShowAddDeposit(true); }} className="bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"><Icons.Plus /> Deposit</button>
                )}
              </div>

              {showAddDeposit && (
                <form onSubmit={handleAddDeposit} className="bg-slate-50 border border-slate-100 p-4 rounded-xl mb-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Member</label>
                      <select value={depMemberId} onChange={(e) => setDepMemberId(e.target.value)} className="w-full rounded-lg border border-slate-200 p-1.5 text-xs bg-white">
                        {activeGroup.members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Amount ($)</label>
                      <input type="number" step="any" required value={depAmount} onChange={(e) => setDepAmount(e.target.value)} className="w-full rounded-lg border border-slate-200 p-1.5 text-xs" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => setShowAddDeposit(false)} className="bg-slate-200 text-slate-700 text-xs font-bold px-3 py-1 rounded-lg">Cancel</button>
                    <button type="submit" className="bg-emerald-600 text-white text-xs font-bold px-4 py-1 rounded-lg">Save</button>
                  </div>
                </form>
              )}

              <div className="overflow-x-auto text-xs">
                {activeGroup.deposits.length === 0 ? (
                  <p className="text-slate-400 italic text-center py-4">No deposits logged.</p>
                ) : (
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase">
                        <th>Member</th>
                        <th>Amount</th>
                        <th>Note</th>
                        <th className="text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeGroup.deposits.map(d => (
                        <tr key={d.id} className="border-b border-slate-50">
                          <td className="py-2 font-semibold">{activeGroup.members.find(m => m.id === d.memberId)?.name || 'Member'}</td>
                          <td className="py-2 font-bold text-emerald-600">${d.amount}</td>
                          <td className="py-2 italic text-slate-500">{d.note}</td>
                          <td className="py-2 text-right"><button onClick={() => handleDeleteDeposit(d.id)} className="text-rose-500"><Icons.Trash /></button></td>
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
          <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-800 text-sm">Expenses Log</h3>
              {activeGroup.members.length > 0 && (
                <button onClick={() => setShowAddExpense(true)} className="bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-sm"><Icons.Plus /> Log Expense</button>
              )}
            </div>

            {showAddExpense && (
              <form onSubmit={handleAddExpense} className="bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Title</label>
                    <input type="text" required value={expTitle} onChange={(e) => setExpTitle(e.target.value)} className="w-full rounded-lg border border-slate-200 p-1.5 text-xs" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Amount ($)</label>
                    <input type="number" step="any" required value={expAmount} onChange={(e) => setExpAmount(e.target.value)} className="w-full rounded-lg border border-slate-200 p-1.5 text-xs" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Category</label>
                    <select value={expCategory} onChange={(e) => setExpCategory(e.target.value)} className="w-full rounded-lg border border-slate-200 p-1.5 text-xs bg-white">
                      {EXPENSE_CATEGORIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Paid By</label>
                    <select value={expPaidBy} onChange={(e) => setExpPaidBy(e.target.value)} className="w-full rounded-lg border border-slate-200 p-1.5 text-xs bg-white">
                      <option value="Group Fund">Common Fund (Kitty)</option>
                      {activeGroup.members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setShowAddExpense(false)} className="bg-slate-200 text-slate-700 text-xs font-bold px-3 py-1 rounded-lg">Cancel</button>
                  <button type="submit" className="bg-emerald-600 text-white text-xs font-bold px-4 py-1 rounded-lg">Save</button>
                </div>
              </form>
            )}

            <div className="overflow-x-auto text-xs">
              {activeGroup.expenses.length === 0 ? (
                <p className="text-slate-400 italic text-center py-4">No expenses logged yet.</p>
              ) : (
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase">
                      <th>Details</th>
                      <th>Category</th>
                      <th>Paid By</th>
                      <th>Amount</th>
                      <th className="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeGroup.expenses.map(e => (
                      <tr key={e.id} className="border-b border-slate-50">
                        <td className="py-2.5 font-semibold text-slate-700">{e.title}</td>
                        <td className="py-2.5"><span className="px-1.5 py-0.5 rounded text-[9px] font-bold text-white" style={{ backgroundColor: EXPENSE_CATEGORIES.find(c => c.name === e.category)?.color }}>{e.category}</span></td>
                        <td className="py-2.5 text-slate-600">{e.paidBy === 'Group Fund' ? '🏦 Common Pool' : activeGroup.members.find(m => m.id === e.paidBy)?.name || 'Member'}</td>
                        <td className="py-2.5 font-bold text-rose-600">${e.amount}</td>
                        <td className="py-2.5 text-right"><button onClick={() => handleDeleteExpense(e.id)} className="text-rose-500"><Icons.Trash /></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {activeTab === 'ai-advisor' && activeGroup && (
          <div className="space-y-5">
            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="p-2 bg-indigo-500/20 rounded-xl text-indigo-400"><Icons.Sparkles /></div>
                <div>
                  <h3 className="font-extrabold text-base tracking-wide animate-pulse">Gemini Intelligent Mess Advisor</h3>
                  <p className="text-[11px] text-indigo-300">Advanced spend-auditing & custom routine generation</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 mt-3">Provides automatic routine analysis, shopping plans, and balance optimizations customized to your group statistics using Gemini 2.5-flash.</p>
              <div className="mt-5 pt-4 border-t border-slate-800 flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="flex gap-1 bg-slate-950 p-1 rounded-xl">
                  <button onClick={() => setAdviceStyle('thrifty')} className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all ${adviceStyle === 'thrifty' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}>Thrifty</button>
                  <button onClick={() => setAdviceStyle('balanced')} className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all ${adviceStyle === 'balanced' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}>Balanced</button>
                </div>
                <button onClick={askGeminiAdvisor} disabled={aiLoading} className="bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-800 text-white text-xs font-black py-2.5 px-5 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer">
                  {aiLoading ? <><Icons.Loader /> Analyzing...</> : <><Icons.Sparkles /> Get Custom Routine</>}
                </button>
              </div>
            </div>

            {aiLoading && (
              <div className="bg-white rounded-2xl p-8 text-center space-y-3 shadow-sm border border-slate-100">
                <div className="inline-flex p-3 bg-indigo-50 text-indigo-600 rounded-full animate-bounce"><Icons.Sparkles /></div>
                <h4 className="font-bold text-slate-800 text-sm">Analyzing dataset...</h4>
              </div>
            )}

            {aiError && <div className="bg-rose-50 text-rose-700 p-4 rounded-xl text-xs">⚠️ {aiError}</div>}

            {aiReport && !aiLoading && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-4">
                <h4 className="text-sm font-black text-slate-800 border-b border-slate-100 pb-2 flex items-center gap-1.5">🤖 Optimized Group Strategy Report</h4>
                <div className="prose prose-slate text-slate-600 text-xs leading-relaxed">{renderFormattedReport(aiReport)}</div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'groups' && (
          <div className="space-y-5">
            <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm">
              <h3 className="font-bold text-slate-800 text-sm mb-4">Create New Cycle / Group</h3>
              <form onSubmit={handleCreateGroup} className="space-y-3">
                <input type="text" required value={newGroupName} onChange={(e) => setNewGroupName(e.target.value)} className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:outline-none" placeholder="August Mess Batch A" />
                <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-2 rounded-lg text-sm flex items-center justify-center gap-1.5 shadow-sm"><Icons.Plus /> Start New Project</button>
              </form>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-100 py-4 text-xs text-slate-400 mt-auto text-center z-20">
        <p>© 2026 Mess Mate Pro • Powered by Gemini AI Advisor • Data saved locally.</p>
      </footer>
    </div>
  );
}
