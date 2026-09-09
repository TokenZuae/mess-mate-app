import React, { useState, useEffect, useMemo } from 'react';
​// Dual-tone modern SVG Icon Set
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
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
</svg>
),
Calendar: ({ className = "w-5 h-5" }) => (
<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
</svg>
),
Wallet: ({ className = "w-5 h-5" }) => (
<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
</svg>
),
History: ({ className = "w-5 h-5" }) => (
<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
),
CheckCircle: ({ className = "w-5 h-5" }) => (
<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
),
Trash: ({ className = "w-5 h-5" }) => (
<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
</svg>
),
Google: ({ className = "w-4 h-4" }) => (
<svg className={className} viewBox="0 0 24 24">
<path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
<path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
<path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
<path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
</svg>
),
LogOut: ({ className = "w-4 h-4" }) => (
<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
</svg>
)
};
​const CATEGORIES = ['Groceries', 'Vegetables', 'Gas & Electric', 'Rent & Maid', 'Water & Milk', 'Other'];
​export default function App() {
const getTodayString = () => new Date().toISOString().split('T')[0];
​// Google Authentication State
const [user, setUser] = useState(() => {
const saved = localStorage.getItem('mess_user');
return saved ? JSON.parse(saved) : null;
});
const [showAuthModal, setShowAuthModal] = useState(false);
​// Application Navigation State
const [activeTab, setActiveTab] = useState('dashboard');
const [cycleName, setCycleName] = useState('Current Mess Cycle');
const [startDate, setStartDate] = useState(() => getTodayString());
const [endDate, setEndDate] = useState('');
const [isCycleEnded, setIsCycleEnded] = useState(false);
​// Data Collections
const [members, setMembers] = useState(() => {
const saved = localStorage.getItem('mess_members');
return saved ? JSON.parse(saved) : [
{ id: '1', name: 'Member A', joinDate: getTodayString() },
{ id: '2', name: 'Member B', joinDate: getTodayString() },
{ id: '3', name: 'Member C', joinDate: getTodayString() }
];
});
​const [deposits, setDeposits] = useState(() => {
const saved = localStorage.getItem('mess_deposits');
return saved ? JSON.parse(saved) : [];
});
​const [expenses, setExpenses] = useState(() => {
const saved = localStorage.getItem('mess_expenses');
return saved ? JSON.parse(saved) : [];
});
​const [savedCycles, setSavedCycles] = useState(() => {
const saved = localStorage.getItem('mess_saved_cycles');
return saved ? JSON.parse(saved) : [];
});
​// Form Inputs
const [newMemberName, setNewMemberName] = useState('');
const [newMemberJoinDate, setNewMemberJoinDate] = useState(getTodayString());
​const [depositMemberId, setDepositMemberId] = useState('');
const [depositAmount, setDepositAmount] = useState('');
const [depositDate, setDepositDate] = useState(getTodayString());
​const [expenseTitle, setExpenseTitle] = useState('');
const [expenseAmount, setExpenseAmount] = useState('');
const [expensePayer, setExpensePayer] = useState('kitty');
const [expenseCategory, setExpenseCategory] = useState('Groceries');
const [expenseDate, setExpenseDate] = useState(getTodayString());
​// Save Authentication & App State to LocalStorage
useEffect(() => {
if (user) {
localStorage.setItem('mess_user', JSON.stringify(user));
} else {
localStorage.removeItem('mess_user');
}
}, [user]);
​useEffect(() => {
localStorage.setItem('mess_members', JSON.stringify(members));
}, [members]);
​useEffect(() => {
localStorage.setItem('mess_deposits', JSON.stringify(deposits));
}, [deposits]);
​useEffect(() => {
localStorage.setItem('mess_expenses', JSON.stringify(expenses));
}, [expenses]);
​useEffect(() => {
localStorage.setItem('mess_saved_cycles', JSON.stringify(savedCycles));
}, [savedCycles]);
​// Default Deposit Member Selector
useEffect(() => {
if (members.length > 0 && !depositMemberId) {
setDepositMemberId(members[0].id);
}
}, [members, depositMemberId]);
​// Google Auth Simulation & Handler
const handleGoogleSignIn = () => {
// Standard Google Authentication logic
// For WebView / Native standard simulation, prompt user or use Google GIS client
const demoUser = {
name: "Mess Member",
email: "user.messmate@gmail.com",
picture: "https://lh3.googleusercontent.com/a/default-user=s96-c",
signedInAt: new Date().toLocaleTimeString()
};
setUser(demoUser);
setShowAuthModal(false);
};
​const handleSignOut = () => {
setUser(null);
};
​// --- TIME-SEGMENTED SPLIT CALCULATION ENGINE ---
const calculations = useMemo(() => {
const totalDeposits = deposits.reduce((sum, d) => sum + Number(d.amount), 0);
​const memberStats = {};
members.forEach(m => {
memberStats[m.id] = {
...m,
totalDeposited: 0,
directPaid: 0,
calculatedExpense: 0,
netBalance: 0
};
});
​deposits.forEach(d => {
if (memberStats[d.memberId]) {
memberStats[d.memberId].totalDeposited += Number(d.amount);
}
});
​let totalExpenseAmount = 0;
let kittySpent = 0;
​const categoryBreakdown = {};
CATEGORIES.forEach(c => (categoryBreakdown[c] = 0));
​expenses.forEach(exp => {
const amt = Number(exp.amount);
totalExpenseAmount += amt;
​if (categoryBreakdown[exp.category] !== undefined) {
categoryBreakdown[exp.category] += amt;
}
​const activeMembers = members.filter(m => new Date(m.joinDate) <= new Date(exp.date));
const activeCount = activeMembers.length > 0 ? activeMembers.length : members.length;
const sharePerHead = amt / activeCount;
​if (exp.payerId === 'kitty') {
kittySpent += amt;
} else if (memberStats[exp.payerId]) {
memberStats[exp.payerId].directPaid += amt;
}
​if (activeMembers.length > 0) {
activeMembers.forEach(m => {
memberStats[m.id].calculatedExpense += sharePerHead;
});
} else {
members.forEach(m => {
memberStats[m.id].calculatedExpense += amt / members.length;
});
}
});
​Object.values(memberStats).forEach(m => {
const totalContributed = m.totalDeposited + m.directPaid;
m.netBalance = totalContributed - m.calculatedExpense;
});
​const kittyBalance = totalDeposits - kittySpent;
​return {
totalDeposits,
totalExpenseAmount,
kittySpent,
kittyBalance,
memberStats: Object.values(memberStats),
categoryBreakdown
};
}, [members, deposits, expenses]);
​// Actions
const handleAddMember = (e) => {
e.preventDefault();
if (!newMemberName.trim()) return;
const newMember = {
id: Date.now().toString(),
name: newMemberName.trim(),
joinDate: newMemberJoinDate || getTodayString()
};
setMembers([...members, newMember]);
setNewMemberName('');
setNewMemberJoinDate(getTodayString());
};
​const handleDeleteMember = (id) => {
setMembers(members.filter(m => m.id !== id));
setDeposits(deposits.filter(d => d.memberId !== id));
};
​const handleAddDeposit = (e) => {
e.preventDefault();
if (!depositAmount || Number(depositAmount) <= 0) return;
const newDep = {
id: Date.now().toString(),
memberId: depositMemberId,
amount: Number(depositAmount),
date: depositDate || getTodayString()
};
setDeposits([...deposits, newDep]);
setDepositAmount('');
};
​const handleAddExpense = (e) => {
e.preventDefault();
if (!expenseTitle.trim() || !expenseAmount || Number(expenseAmount) <= 0) return;
const newExp = {
id: Date.now().toString(),
title: expenseTitle.trim(),
amount: Number(expenseAmount),
payerId: expensePayer,
category: expenseCategory,
date: expenseDate || getTodayString()
};
setExpenses([...expenses, newExp]);
setExpenseTitle('');
setExpenseAmount('');
};
​const handleEndCycle = () => {
const today = getTodayString();
setEndDate(today);
setIsCycleEnded(true);
​const completedCycle = {
id: Date.now().toString(),
name: cycleName,
startDate,
endDate: today,
members,
deposits,
expenses,
summary: calculations
};
​setSavedCycles([completedCycle, ...savedCycles]);
};
​const handleStartNewCycle = () => {
setCycleName(Mess Cycle (${getTodayString()}));
setStartDate(getTodayString());
setEndDate('');
setIsCycleEnded(false);
setDeposits([]);
setExpenses([]);
};
​return (
<div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-sans antialiased pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(5rem,env(safe-area-inset-bottom))]">
{/* Top Header */}
<header className="px-4 py-3 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80 sticky top-0 z-30 flex items-center justify-between">
<div className="flex items-center space-x-2">
<div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-emerald-500/20">
M
</div>
<div>
<h1 className="text-base font-bold text-slate-100 leading-tight">Mess Mate Pro</h1>
<p className="text-xs text-slate-400">{cycleName}</p>
</div>
</div>
​{/* User Auth & Cycle Buttons */}
<div className="flex items-center space-x-2">
{user ? (
<div className="flex items-center space-x-2 bg-slate-800/80 border border-slate-700/60 rounded-xl px-2 py-1">
<img src={user.picture} alt="Profile" className="w-6 h-6 rounded-full border border-emerald-400/40" />
<button
onClick={handleSignOut}
title="Sign Out"
className="text-slate-400 hover:text-rose-400 transition-colors p-1"
>
<Icons.LogOut className="w-3.5 h-3.5" />
</button>
</div>
) : (
<button
onClick={handleGoogleSignIn}
className="px-2.5 py-1.5 bg-slate-800 border border-slate-700/80 hover:border-emerald-500/50 text-slate-200 rounded-xl text-xs font-medium flex items-center space-x-1.5 transition-all"
>
<Icons.Google className="w-3.5 h-3.5" />
<span>Sign in</span>
</button>
)}
​{!isCycleEnded ? (
<button
onClick={handleEndCycle}
className="px-2.5 py-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-xl text-xs font-semibold flex items-center space-x-1 hover:bg-amber-500/20 transition-all"
>
<Icons.CheckCircle className="w-3.5 h-3.5" />
<span>End</span>
</button>
) : (
<button
onClick={handleStartNewCycle}
className="px-2.5 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs font-semibold flex items-center space-x-1 hover:bg-emerald-500/20 transition-all"
>
<Icons.Plus className="w-3.5 h-3.5" />
<span>New</span>
</button>
)}
</div>
</header>
​{/* Main Content Area /}
<main className="flex-1 p-4 max-w-lg mx-auto w-full space-y-4">
{/ User Greeting Banner if Signed In */}
{user && (
<div className="p-3 rounded-xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/20 flex items-center justify-between text-xs">
<div className="flex items-center space-x-2">
<span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
<span className="text-slate-300">Signed in as <strong className="text-emerald-400">{user.email}</strong></span>
</div>
</div>
)}
​{/* TAB 1: DASHBOARD /}
{activeTab === 'dashboard' && (
<div className="space-y-4">
{/ Cycle Status Summary */}
<div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-850 border border-slate-800 shadow-xl relative overflow-hidden">
<div className="flex justify-between items-start">
<div>
<span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
{isCycleEnded ? 'Completed Cycle' : 'Active Timeline'}
</span>
<h2 className="text-2xl font-extrabold text-white mt-2">
৳{calculations.totalExpenseAmount.toLocaleString()}
</h2>
<p className="text-xs text-slate-400 mt-0.5">Total Expenditure</p>
</div>
<div className="text-right">
<p className="text-xs font-medium text-slate-400">Kitty Fund Balance</p>
<p className={text-base font-bold ${calculations.kittyBalance >= 0 ? 'text-emerald-400' : 'text-rose-400'}}>
৳{calculations.kittyBalance.toLocaleString()}
</p>
</div>
</div>
​<div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800/80 text-xs">
<div>
<span className="text-slate-500 block text-[10px]">Start Date</span>
<span className="font-medium text-slate-300">{startDate}</span>
</div>
<div>
<span className="text-slate-500 block text-[10px]">End Date</span>
<span className="font-medium text-slate-300">{endDate || 'In Progress'}</span>
</div>
</div>
</div>
​{/* Member Net Balances */}
<div className="space-y-2">
<div className="flex justify-between items-center px-1">
<h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Time-Segmented Settlement</h3>
<span className="text-[11px] text-slate-500">{members.length} Active Members</span>
</div>
​<div className="grid gap-2">
{calculations.memberStats.map(m => {
const isCredit = m.netBalance >= 0;
return (
<div key={m.id} className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
<div>
<div className="flex items-center space-x-2">
<p className="text-sm font-semibold text-slate-200">{m.name}</p>
<span className="text-[10px] text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded">Joined: {m.joinDate}</span>
</div>
<div className="flex items-center space-x-3 text-xs text-slate-400 mt-1">
<span>Paid: ৳{(m.totalDeposited + m.directPaid).toLocaleString()}</span>
<span>Cost: ৳{Math.round(m.calculatedExpense).toLocaleString()}</span>
</div>
</div>
<div className="text-right">
<span className={text-sm font-bold ${isCredit ? 'text-emerald-400' : 'text-rose-400'}}>
{isCredit ? '+' : ''}৳{Math.abs(Math.round(m.netBalance)).toLocaleString()}
</span>
<p className="text-[10px] text-slate-500">{isCredit ? 'Refund Owed' : 'Needs to Pay'}</p>
</div>
</div>
);
})}
</div>
</div>
​{/* Category Expense Breakdown */}
<div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
<h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Expense Categories</h3>
<div className="space-y-2">
{CATEGORIES.map(cat => {
const catAmt = calculations.categoryBreakdown[cat] || 0;
const pct = calculations.totalExpenseAmount > 0 ? (catAmt / calculations.totalExpenseAmount) * 100 : 0;
return (
<div key={cat} className="space-y-1">
<div className="flex justify-between text-xs">
<span className="text-slate-300">{cat}</span>
<span className="text-slate-400 font-medium">৳{catAmt.toLocaleString()} ({Math.round(pct)}%)</span>
</div>
<div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
<div className="h-full bg-emerald-500 rounded-full" style={{ width: ${pct}% }}></div>
</div>
</div>
);
})}
</div>
</div>
</div>
)}
​{/* TAB 2: EXPENSES & DEPOSITS /}
{activeTab === 'entries' && (
<div className="space-y-4">
{/ Add Expense Form */}
<form onSubmit={handleAddExpense} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
<h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
<Icons.Plus className="w-4 h-4 text-emerald-400" />
<span>Log Expense</span>
</h3>
​<div className="grid grid-cols-2 gap-2">
<input
type="text"
placeholder="Expense Title"
value={expenseTitle}
onChange={e => setExpenseTitle(e.target.value)}
className="col-span-2 w-full px-3 py-2 bg-slate-800 border border-slate-700/60 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
required
/>
<input
type="number"
placeholder="Amount (৳)"
value={expenseAmount}
onChange={e => setExpenseAmount(e.target.value)}
className="w-full px-3 py-2 bg-slate-800 border border-slate-700/60 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
required
/>
<input
type="date"
value={expenseDate}
onChange={e => setExpenseDate(e.target.value)}
className="w-full px-3 py-2 bg-slate-800 border border-slate-700/60 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
required
/>
</div>
​<div className="grid grid-cols-2 gap-2">
<div>
<label className="text-[10px] text-slate-400 block mb-1">Paid From / By</label>
<select
value={expensePayer}
onChange={e => setExpensePayer(e.target.value)}
className="w-full px-3 py-2 bg-slate-800 border border-slate-700/60 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
>
<option value="kitty">Kitty Fund (Common Pool)</option>
{members.map(m => (
<option key={m.id} value={m.id}>{m.name}</option>
))}
</select>
</div>
<div>
<label className="text-[10px] text-slate-400 block mb-1">Category</label>
<select
value={expenseCategory}
onChange={e => setExpenseCategory(e.target.value)}
className="w-full px-3 py-2 bg-slate-800 border border-slate-700/60 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
>
{CATEGORIES.map(c => (
<option key={c} value={c}>{c}</option>
))}
</select>
</div>
</div>
​<button
type="submit"
className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-lg shadow-emerald-500/20"
>
Add Expense Entry
</button>
</form>
​{/* Add Deposit Form */}
<form onSubmit={handleAddDeposit} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
<h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
<Icons.Wallet className="w-4 h-4 text-teal-400" />
<span>Log Kitty Fund Deposit</span>
</h3>
​<div className="grid grid-cols-2 gap-2">
<select
value={depositMemberId}
onChange={e => setDepositMemberId(e.target.value)}
className="w-full px-3 py-2 bg-slate-800 border border-slate-700/60 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-teal-500"
>
{members.map(m => (
<option key={m.id} value={m.id}>{m.name}</option>
))}
</select>
<input
type="number"
placeholder="Amount (৳)"
value={depositAmount}
onChange={e => setDepositAmount(e.target.value)}
className="w-full px-3 py-2 bg-slate-800 border border-slate-700/60 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500"
required
/>
</div>
​<button
type="submit"
className="w-full py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-lg shadow-teal-500/20"
>
Record Deposit
</button>
</form>
​{/* Recent Expense Log */}
<div className="space-y-2">
<h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">Expense Log</h3>
{expenses.length === 0 ? (
<p className="text-xs text-slate-500 text-center py-4">No expenses logged in this cycle yet.</p>
) : (
expenses.map(exp => {
const payerName = exp.payerId === 'kitty' ? 'Kitty Fund' : members.find(m => m.id === exp.payerId)?.name || 'Member';
return (
<div key={exp.id} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
<div>
<p className="font-semibold text-slate-200">{exp.title}</p>
<p className="text-[10px] text-slate-400">{exp.category} • Paid by {payerName} • {exp.date}</p>
</div>
<span className="font-bold text-slate-100">৳{exp.amount}</span>
</div>
);
})
)}
</div>
</div>
)}
​{/* TAB 3: MEMBERS /}
{activeTab === 'members' && (
<div className="space-y-4">
{/ Add Member Form */}
<form onSubmit={handleAddMember} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
<h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
<Icons.Users className="w-4 h-4 text-indigo-400" />
<span>Onboard New Member</span>
</h3>
​<div className="grid grid-cols-2 gap-2">
<input
type="text"
placeholder="Member Name"
value={newMemberName}
onChange={e => setNewMemberName(e.target.value)}
className="w-full px-3 py-2 bg-slate-800 border border-slate-700/60 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
required
/>
<input
type="date"
value={newMemberJoinDate}
onChange={e => setNewMemberJoinDate(e.target.value)}
className="w-full px-3 py-2 bg-slate-800 border border-slate-700/60 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
required
/>
</div>
​<button
type="submit"
className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-xl text-xs transition-all shadow-lg shadow-indigo-500/20"
>
Add Member to Mess
</button>
</form>
​{/* Active Members Directory */}
<div className="space-y-2">
<h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">Active Mess Members</h3>
{members.map(m => (
<div key={m.id} className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
<div>
<p className="text-sm font-semibold text-slate-200">{m.name}</p>
<p className="text-[10px] text-slate-400">Joining Date: {m.joinDate}</p>
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
​{/* TAB 4: TIMELINES & HISTORY */}
{activeTab === 'timelines' && (
<div className="space-y-4">
<div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
<h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Timeline Settings</h3>
​<div className="space-y-2 text-xs">
<div>
<label className="text-slate-400 block mb-1">Mess Cycle Title</label>
<input
type="text"
value={cycleName}
onChange={e => setCycleName(e.target.value)}
className="w-full px-3 py-2 bg-slate-800 border border-slate-700/60 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500"
/>
</div>
<div className="grid grid-cols-2 gap-2">
<div>
<label className="text-slate-400 block mb-1">Start Date</label>
<input
type="date"
value={startDate}
onChange={e => setStartDate(e.target.value)}
className="w-full px-3 py-2 bg-slate-800 border border-slate-700/60 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500"
/>
</div>
<div>
<label className="text-slate-400 block mb-1">End Date</label>
<input
type="date"
value={endDate}
onChange={e => setEndDate(e.target.value)}
placeholder="Open-ended"
className="w-full px-3 py-2 bg-slate-800 border border-slate-700/60 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500"
/>
</div>
</div>
</div>
</div>
​{/* Saved Cycles History */}
<div className="space-y-2">
<h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">Past Cycle Records</h3>
{savedCycles.length === 0 ? (
<p className="text-xs text-slate-500 text-center py-4">No completed timelines archived yet.</p>
) : (
savedCycles.map(sc => (
<div key={sc.id} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
<div className="flex justify-between items-center">
<p className="text-xs font-bold text-slate-200">{sc.name}</p>
<span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
৳{sc.summary?.totalExpenseAmount || 0}
</span>
</div>
<p className="text-[10px] text-slate-400">{sc.startDate} to {sc.endDate}</p>
</div>
))
)}
</div>
</div>
)}
</main>
​{/* Navigation Bar */}
<nav className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-lg border-t border-slate-800/80 px-2 py-2 flex justify-around items-center z-40 max-w-lg mx-auto">
{[
{ id: 'dashboard', label: 'Overview', icon: Icons.TrendingUp },
{ id: 'entries', label: 'Expenses', icon: Icons.Plus },
{ id: 'members', label: 'Members', icon: Icons.Users },
{ id: 'timelines', label: 'Timelines', icon: Icons.History }
].map(tab => {
const Icon = tab.icon;
const isActive = activeTab === tab.id;
return (
<button
key={tab.id}
onClick={() => setActiveTab(tab.id)}
className={flex flex-col items-center space-y-1 px-4 py-1 rounded-xl transition-all ${ isActive ? 'text-emerald-400 font-bold scale-105' : 'text-slate-500 hover:text-slate-300' }}
>
<Icon className="w-5 h-5" />
<span className="text-[10px]">{tab.label}</span>
</button>
);
})}
</nav>
</div>
);
}
