import { useState, useEffect } from 'react'
import './Calculator.css'

function Calculator() {
    const [bill, setBill] = useState('')
    const [tip, setTip] = useState('')
    const [total, setTotal] = useState('')
    const [lastChanged, setLastChanged] = useState(null)
    const [focusedField, setFocusedField] = useState(null)

    // Auto-calculate when 2 fields are filled
    useEffect(() => {
        const billNum = parseFloat(bill) || 0
        const tipNum = parseFloat(tip) || 0
        const totalNum = parseFloat(total) || 0

        const hasBill = bill && billNum > 0
        const hasTip = tip && tipNum > 0
        const hasTotal = total && totalNum > 0

        const filledCount = [hasBill, hasTip, hasTotal].filter(Boolean).length

        // Only calculate if exactly 2 fields are filled
        if (filledCount === 2) {
            // Determine which field to calculate based on what's missing
            if (!hasBill && hasTip && hasTotal) {
                // Calculate bill: bill = total - tip
                const calculatedBill = totalNum - tipNum
                if (calculatedBill > 0) {
                    setBill(calculatedBill.toFixed(2))
                }
            } else if (hasBill && !hasTip && hasTotal) {
                // Calculate tip: tip = total - bill
                const calculatedTip = totalNum - billNum
                if (calculatedTip > 0) {
                    setTip(calculatedTip.toFixed(2))
                }
            } else if (hasBill && hasTip && !hasTotal) {
                // Calculate total: total = bill + tip
                const calculatedTotal = billNum + tipNum
                setTotal(calculatedTotal.toFixed(2))
            }
        }
    }, [bill, tip, total, lastChanged])

    const handleBillChange = (value) => {
        // Only allow numbers and one decimal point
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            const numValue = parseFloat(value)
            if (value === '' || (numValue >= 0 && value.split('.').length <= 2)) {
                setBill(value)
                setLastChanged('bill')
            }
        }
    }

    const handleTipChange = (value) => {
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            const numValue = parseFloat(value)
            if (value === '' || (numValue >= 0 && value.split('.').length <= 2)) {
                setTip(value)
                setLastChanged('tip')
            }
        }
    }

    const handleTotalChange = (value) => {
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            const numValue = parseFloat(value)
            if (value === '' || (numValue >= 0 && value.split('.').length <= 2)) {
                setTotal(value)
                setLastChanged('total')
            }
        }
    }

    const handleReset = () => {
        setBill('')
        setTip('')
        setTotal('')
        setLastChanged(null)
        setFocusedField(null)
    }

    const handleShare = async () => {
        const billNum = parseFloat(bill) || 0
        const tipNum = parseFloat(tip) || 0
        const totalNum = parseFloat(total) || 0

        let shareText = 'Bill 🍕 Tip Calculator Results:\n\n'

        if (billNum > 0) shareText += `Bill: $${billNum.toFixed(2)}\n`
        if (tipNum > 0) shareText += `Tip: $${tipNum.toFixed(2)}\n`
        if (totalNum > 0) shareText += `Total: $${totalNum.toFixed(2)}\n`

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Bill Tip Calculator Results',
                    text: shareText
                })
            } catch (err) {
                // User cancelled or error occurred
                copyToClipboard(shareText)
            }
        } else {
            copyToClipboard(shareText)
        }
    }

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            // Show feedback (you could add a toast notification here)
            alert('Results copied to clipboard!')
        })
    }

    return (
        <div className="calculator-container">
            <div className="receipt">
                <div className="receipt-header">
                    <div className="restaurant-name">🍕 PIZZA PALACE</div>
                    <div className="receipt-subtitle">Tip Calculator</div>
                </div>

                <div className="input-group">
                    <label htmlFor="bill">Bill Amount</label>
                    <div className="input-wrapper">
                        <span className="currency-symbol">$</span>
                        <input
                            id="bill"
                            type="text"
                            inputMode="decimal"
                            value={bill}
                            onChange={(e) => handleBillChange(e.target.value)}
                            onFocus={() => setFocusedField('bill')}
                            onBlur={() => setFocusedField(null)}
                            placeholder="0.00"
                            className={focusedField === 'bill' ? 'focused' : ''}
                        />
                    </div>
                </div>

                <div className="input-group">
                    <label htmlFor="tip">Tip Amount</label>
                    <div className="input-wrapper">
                        <span className="currency-symbol">$</span>
                        <input
                            id="tip"
                            type="text"
                            inputMode="decimal"
                            value={tip}
                            onChange={(e) => handleTipChange(e.target.value)}
                            onFocus={() => setFocusedField('tip')}
                            onBlur={() => setFocusedField(null)}
                            placeholder="0.00"
                            className={focusedField === 'tip' ? 'focused' : ''}
                        />
                    </div>
                </div>

                <div className="divider"></div>

                <div className="input-group total-group">
                    <label htmlFor="total">Total Amount</label>
                    <div className="input-wrapper">
                        <span className="currency-symbol">$</span>
                        <input
                            id="total"
                            type="text"
                            inputMode="decimal"
                            value={total}
                            onChange={(e) => handleTotalChange(e.target.value)}
                            onFocus={() => setFocusedField('total')}
                            onBlur={() => setFocusedField(null)}
                            placeholder="0.00"
                            className={focusedField === 'total' ? 'focused' : ''}
                        />
                    </div>
                </div>

                <div className="receipt-footer">
                    <div className="help-text">
                        💡 Enter any two values to calculate the third
                    </div>
                </div>
            </div>

            <div className="action-buttons">
                <button className="btn btn-reset" onClick={handleReset}>
                    🔄 Reset
                </button>
                <button className="btn btn-share" onClick={handleShare}>
                    📤 Share
                </button>
            </div>
        </div>
    )
}

export default Calculator
