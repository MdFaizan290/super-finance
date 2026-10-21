import React, { useEffect, useMemo, useState } from "react";
import "./Investment.css";
import { useNavigate } from "react-router-dom";

const STOCKS = [
    { symbol: "RELIANCE", name: "Reliance Industries", price: 1450 },
    { symbol: "TCS", name: "Tata Consultancy Services", price: 3200 },
    { symbol: "INFY", name: "Infosys", price: 1550 },
    { symbol: "HDFCBANK", name: "HDFC Bank", price: 950 },
    { symbol: "ICICIBANK", name: "ICICI Bank", price: 1250 },
    { symbol: "SBIN", name: "State Bank of India", price: 780 },
    { symbol: "ITC", name: "ITC Limited", price: 420 },
    { symbol: "TATAMOTORS", name: "Tata Motors", price: 700 },
    // { symbol: "WIPRO", name: "Wipro", price: 577.75 },
];
 
const INITIAL_CASH = 100000;
const money = (value) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2,
    }).format(value);

function readStorage(key, fallback) {
    try {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : fallback;
    } catch {
        return fallback;
    }
}

export default function Investment() {
    const navigate = useNavigate();
    const [cash, setCash] = useState(() =>
        readStorage("sf_stock_cash", INITIAL_CASH)
    );

    const [holdings, setHoldings] = useState(() =>
        readStorage("sf_stock_holdings", [])
    );

    const [transactions, setTransactions] = useState(() =>
        readStorage("sf_stock_transactions", [])
    );

    const [realizedPL, setRealizedPL] = useState(() =>
        readStorage("sf_stock_realized", 0)
    );

    const [selectedSymbol, setSelectedSymbol] = useState("RELIANCE");
    const [tradeType, setTradeType] = useState("BUY");
    const [quantity, setQuantity] = useState("1");
    const [search, setSearch] = useState("");
    const [message, setMessage] = useState(null);
    const [activeTab, setActiveTab] = useState("holdings");

    useEffect(() => {
        localStorage.setItem("sf_stock_cash", JSON.stringify(cash));
        localStorage.setItem("sf_stock_holdings", JSON.stringify(holdings));
        localStorage.setItem(
            "sf_stock_transactions",
            JSON.stringify(transactions)
        );
        localStorage.setItem("sf_stock_realized", JSON.stringify(realizedPL));
    }, [cash, holdings, transactions, realizedPL]);

    const selectedStock = STOCKS.find(
        (stock) => stock.symbol === selectedSymbol
    );

    const getPrice = (symbol) =>
        STOCKS.find((stock) => stock.symbol === symbol)?.price ?? 0;

    const filteredStocks = STOCKS.filter(
        (stock) =>
            stock.name.toLowerCase().includes(search.toLowerCase()) ||
            stock.symbol.toLowerCase().includes(search.toLowerCase())
    );

    const invested = holdings.reduce(
        (total, item) => total + item.quantity * item.avgPrice,
        0
    );

    const marketValue = holdings.reduce(
        (total, item) => total + item.quantity * getPrice(item.symbol),
        0
    );

    const unrealizedPL = marketValue - invested;
    const totalPL = realizedPL + unrealizedPL;
    const portfolioValue = cash + marketValue;

    const estimatedOrderValue =
        (selectedStock?.price ?? 0) * (Number(quantity) || 0);

    const holdingForSelected = holdings.find(
        (item) => item.symbol === selectedSymbol
    );

    const executeTrade = (event) => {
        event.preventDefault();

        const qty = Number(quantity);
        const stock = selectedStock;

        if (!stock || !Number.isSafeInteger(qty) || qty <= 0) {
            setMessage({ type: "error", text: "Enter a valid whole-number quantity." });
            return;
        }

        const price = stock.price;
        const amount = price * qty;

        if (tradeType === "BUY") {
            if (amount > cash) {
                setMessage({
                    type: "error",
                    text: "Insufficient cash balance for this order.",
                });
                return;
            }

            setCash((previous) => previous - amount);

            setHoldings((previous) => {
                const existing = previous.find(
                    (item) => item.symbol === stock.symbol
                );

                if (!existing) {
                    return [
                        ...previous,
                        {
                            symbol: stock.symbol,
                            name: stock.name,
                            quantity: qty,
                            avgPrice: price,
                        },
                    ];
                }

                return previous.map((item) =>
                    item.symbol === stock.symbol
                        ? {
                            ...item,
                            quantity: item.quantity + qty,
                            avgPrice:
                                (item.quantity * item.avgPrice + amount) /
                                (item.quantity + qty),
                        }
                        : item
                );
            });
        } else {
            const existing = holdings.find(
                (item) => item.symbol === stock.symbol
            );

            if (!existing || existing.quantity < qty) {
                setMessage({
                    type: "error",
                    text: "You don't own enough shares to sell this quantity.",
                });
                return;
            }

            const profit = (price - existing.avgPrice) * qty;

            setCash((previous) => previous + amount);
            setRealizedPL((previous) => previous + profit);

            setHoldings((previous) =>
                previous
                    .map((item) =>
                        item.symbol === stock.symbol
                            ? { ...item, quantity: item.quantity - qty }
                            : item
                    )
                    .filter((item) => item.quantity > 0)
            );
        }

        setTransactions((previous) => [
            {
                id: `${Date.now()}-${Math.random()}`,
                symbol: stock.symbol,
                name: stock.name,
                type: tradeType,
                quantity: qty,
                price,
                amount,
                profit:
                    tradeType === "SELL"
                        ? (price -
                            (holdings.find((item) => item.symbol === stock.symbol)
                                ?.avgPrice ?? price)) *
                        qty
                        : null,
                date: new Date().toISOString(),
            },
            ...previous,
        ]);

        setMessage({
            type: "success",
            text: `${tradeType === "BUY" ? "Bought" : "Sold"} ${qty} shares of ${stock.symbol
                } successfully.`,
        });

        setQuantity("1");
    };

    const resetDemo = () => {
        const confirmed = window.confirm(
            "Reset your demo portfolio, cash balance and transaction history?"
        );

        if (!confirmed) return;

        setCash(INITIAL_CASH);
        setHoldings([]);
        setTransactions([]);
        setRealizedPL(0);
        setMessage({ type: "success", text: "Demo portfolio has been reset." });
    };

    const formatPL = (value) =>
        `${value > 0 ? "+" : ""}${money(value)}`;

    const formatDate = (value) =>
        new Date(value).toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
        });

    const statCards = [
        {
            title: "Total Portfolio Value",
            value: money(portfolioValue),
            icon: "fa-wallet",
            color: "violet",
        },
        {
            title: "Available Cash",
            value: money(cash),
            icon: "fa-money-bill-wave",
            color: "blue",
        },
        {
            title: "Invested Amount",
            value: money(invested),
            icon: "fa-chart-pie",
            color: "orange",
        },
        {
            title: "Total Profit / Loss",
            value: formatPL(totalPL),
            icon: "fa-arrow-trend-up",
            color: totalPL >= 0 ? "green" : "red",
            positive: totalPL >= 0,
        },
    ];

    return (
        <main className="sf-investment">
            <header className="sf-invest-header">
                <div>
                    <span className="sf-eyebrow">SUPER FINANCE / MARKETS</span>
                    <h1>Investment Dashboard</h1>
                    <p>Build your portfolio. Track every trade. Understand your returns.</p>
                </div>

                <div className="sf-demo-badge" onClick={() => navigate("/news")} style={{cursor:"pointer"}}>
                    <span />
                    News / Market Update
                </div>
            </header>

            <div className="sf-demo-notice">
                <i className="fa-solid fa-circle-info" />
                Demo market prices only. Trades use virtual money and do not reach a
                stock exchange. Prices are not live.
            </div>

            <section className="sf-stat-grid">
                {statCards.map((card) => (
                    <article className="sf-stat-card" key={card.title}>
                        <div className={`sf-stat-icon ${card.color}`}>
                            <i className={`fa-solid ${card.icon}`} />
                        </div>
                        <p>{card.title}</p>
                        <h2 className={card.positive === undefined ? "" : card.positive ? "sf-positive" : "sf-negative"}>
                            {card.value}
                        </h2>
                        {card.title === "Total Profit / Loss" && (
                            <small>
                                Realized: {money(realizedPL)} · Unrealized: {money(unrealizedPL)}
                            </small>
                        )}
                    </article>
                ))}
            </section>

            <section className="sf-trading-layout">
                <article className="sf-panel sf-order-panel">
                    <div className="sf-panel-heading">
                        <div>
                            <h2>Place an Order</h2>
                            <p>Buy or sell shares using your demo balance.</p>
                        </div>
                        <i className="fa-solid fa-arrow-right-arrow-left" />
                    </div>

                    <div className="sf-trade-toggle">
                        <button
                            type="button"
                            className={tradeType === "BUY" ? "buy active" : "buy"}
                            onClick={() => {
                                setTradeType("BUY");
                                setMessage(null);
                            }}
                        >
                            Buy
                        </button>
                        <button
                            type="button"
                            className={tradeType === "SELL" ? "sell active" : "sell"}
                            onClick={() => {
                                setTradeType("SELL");
                                setMessage(null);
                            }}
                        >
                            Sell
                        </button>
                    </div>

                    <form onSubmit={executeTrade}>
                        <label htmlFor="sf-stock">Select Stock</label>
                        <select
                            id="sf-stock"
                            value={selectedSymbol}
                            onChange={(event) => setSelectedSymbol(event.target.value)}
                        >
                            {STOCKS.map((stock) => (
                                <option key={stock.symbol} value={stock.symbol}>
                                    {stock.symbol} — {stock.name}
                                </option>
                            ))}
                        </select>

                        <div className="sf-selected-stock">
                            <div>
                                <strong>{selectedStock?.symbol}</strong>
                                <span>{selectedStock?.name}</span>
                            </div>
                            <div className="sf-selected-price">
                                {money(selectedStock?.price ?? 0)}
                                <small>Demo price / share</small>
                            </div>
                        </div>

                        {tradeType === "SELL" && (
                            <div className="sf-owned-shares">
                                Owned shares
                                <strong>{holdingForSelected?.quantity ?? 0}</strong>
                            </div>
                        )}

                        <label htmlFor="sf-quantity">Quantity (shares)</label>
                        <input
                            id="sf-quantity"
                            type="number"
                            min="1"
                            step="1"
                            value={quantity}
                            onChange={(event) => setQuantity(event.target.value)}
                            required
                        />

                        <div className="sf-order-total">
                            <span>Estimated order value</span>
                            <strong>{money(estimatedOrderValue)}</strong>
                        </div>

                        <div className="sf-order-total">
                            <span>Cash available</span>
                            <strong>{money(cash)}</strong>
                        </div>

                        <button
                            className={`sf-submit-order ${tradeType === "BUY" ? "buy" : "sell"}`}
                            type="submit"
                        >
                            {tradeType === "BUY" ? "Buy Shares" : "Sell Shares"}
                            <i className="fa-solid fa-arrow-right" />
                        </button>

                        {message && (
                            <div
                                role="status"
                                className={`sf-trade-message ${message.type}`}
                            >
                                {message.text}
                            </div>
                        )}
                    </form>
                </article>

                <article className="sf-panel sf-market-panel">
                    <div className="sf-panel-heading">
                        <div>
                            <h2>Market Watch</h2>
                            <p>Explore available demo stocks.</p>
                        </div>
                        <i className="fa-solid fa-magnifying-glass-chart" />
                    </div>

                    <input
                        className="sf-market-search"
                        type="search"
                        placeholder="Search company or symbol..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />

                    <div className="sf-market-list">
                        {filteredStocks.map((stock) => (
                            <button
                                type="button"
                                className={`sf-market-row ${selectedSymbol === stock.symbol ? "selected" : ""
                                    }`}
                                key={stock.symbol}
                                onClick={() => setSelectedSymbol(stock.symbol)}
                            >
                                <div className="sf-stock-avatar">
                                    {stock.symbol.slice(0, 2)}
                                </div>
                                <div className="sf-stock-name">
                                    <strong>{stock.symbol}</strong>
                                    <span>{stock.name}</span>
                                </div>
                                <div className="sf-stock-quote">
                                    <strong>{money(stock.price)}</strong>
                                    <span>Demo quote</span>
                                </div>
                            </button>
                        ))}

                        {filteredStocks.length === 0 && (
                            <p className="sf-empty">No matching stocks found.</p>
                        )}
                    </div>
                </article>
            </section>

            <section className="sf-panel sf-portfolio-panel">
                <div className="sf-portfolio-heading">
                    <div>
                        <h2>Your Portfolio</h2>
                        <p>Review your holdings and completed trades.</p>
                    </div>

                    <div className="sf-portfolio-actions">
                        <button
                            className={activeTab === "holdings" ? "active" : ""}
                            onClick={() => setActiveTab("holdings")}
                            type="button"
                        >
                            Holdings
                        </button>
                        <button
                            className={activeTab === "history" ? "active" : ""}
                            onClick={() => setActiveTab("history")}
                            type="button"
                        >
                            Trade History
                        </button>
                    </div>
                </div>

                {activeTab === "holdings" ? (
                    <div className="sf-table-wrap">
                        <table className="sf-table">
                            <thead>
                                <tr>
                                    <th>Stock</th>
                                    <th>Qty</th>
                                    <th>Avg. Buy Price</th>
                                    <th>Market Price</th>
                                    <th>Invested</th>
                                    <th>Current Value</th>
                                    <th>Unrealized P&amp;L</th>
                                    <th>Trade</th>
                                </tr>
                            </thead>
                            <tbody>
                                {holdings.map((item) => {
                                    const currentPrice = getPrice(item.symbol);
                                    const cost = item.quantity * item.avgPrice;
                                    const value = item.quantity * currentPrice;
                                    const pl = value - cost;

                                    return (
                                        <tr key={item.symbol}>
                                            <td>
                                                <strong>{item.symbol}</strong>
                                                <small>{item.name}</small>
                                            </td>
                                            <td>{item.quantity}</td>
                                            <td>{money(item.avgPrice)}</td>
                                            <td>{money(currentPrice)}</td>
                                            <td>{money(cost)}</td>
                                            <td>{money(value)}</td>
                                            <td className={pl >= 0 ? "sf-positive" : "sf-negative"}>
                                                <strong>{formatPL(pl)}</strong>
                                                <small>
                                                    {cost > 0 ? `${((pl / cost) * 100).toFixed(2)}%` : "—"}
                                                </small>
                                            </td>
                                            <td>
                                                <button
                                                    className="sf-quick-sell"
                                                    onClick={() => {
                                                        setSelectedSymbol(item.symbol);
                                                        setTradeType("SELL");
                                                        setQuantity(String(item.quantity));
                                                        window.scrollTo({ top: 0, behavior: "smooth" });
                                                    }}
                                                    type="button"
                                                >
                                                    Sell
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {holdings.length === 0 && (
                                    <tr>
                                        <td colSpan="8" className="sf-empty">
                                            No holdings yet. Select a stock and place your first
                                            demo buy order.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="sf-table-wrap">
                        <table className="sf-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Stock</th>
                                    <th>Type</th>
                                    <th>Qty</th>
                                    <th>Price</th>
                                    <th>Order Value</th>
                                    <th>Realized P&amp;L</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((tx) => (
                                    <tr key={tx.id}>
                                        <td>{formatDate(tx.date)}</td>
                                        <td>
                                            <strong>{tx.symbol}</strong>
                                            <small>{tx.name}</small>
                                        </td>
                                        <td>
                                            <span className={`sf-type-pill ${tx.type.toLowerCase()}`}>
                                                {tx.type}
                                            </span>
                                        </td>
                                        <td>{tx.quantity}</td>
                                        <td>{money(tx.price)}</td>
                                        <td>{money(tx.amount)}</td>
                                        <td
                                            className={
                                                tx.profit === null
                                                    ? ""
                                                    : tx.profit >= 0
                                                        ? "sf-positive"
                                                        : "sf-negative"
                                            }
                                        >
                                            {tx.profit === null ? "—" : formatPL(tx.profit)}
                                        </td>
                                    </tr>
                                ))}
                                {transactions.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="sf-empty">
                                            Your completed orders will appear here.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>

            <section className="sf-bottom-summary">
                <div>
                    <span>Realized Profit / Loss</span>
                    <strong className={realizedPL >= 0 ? "sf-positive" : "sf-negative"}>
                        {formatPL(realizedPL)}
                    </strong>
                    <small>From shares already sold</small>
                </div>
                <div>
                    <span>Unrealized Profit / Loss</span>
                    <strong className={unrealizedPL >= 0 ? "sf-positive" : "sf-negative"}>
                        {formatPL(unrealizedPL)}
                    </strong>
                    <small>From your current holdings</small>
                </div>
                <div>
                    <span>Overall Profit / Loss</span>
                    <strong className={totalPL >= 0 ? "sf-positive" : "sf-negative"}>
                        {formatPL(totalPL)}
                    </strong>
                    <small>Realized + unrealized returns</small>
                </div>
            </section>

            <div className="sf-footer-actions">
                <span>
                    <i className="fa-solid fa-shield-halved" /> Virtual trading only
                </span>
                <button type="button" onClick={resetDemo}>
                    <i className="fa-solid fa-rotate-left" /> Reset demo portfolio
                </button>
            </div>
        </main>
    );
}

