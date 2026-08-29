import React, { useState, useEffect } from 'react';

export default function StaffInventoryPage({ user }) {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trainNumber, setTrainNumber] = useState('22477');

  const [selectedItem, setSelectedItem] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [newQuantity, setNewQuantity] = useState(0);
  const [newStatus, setNewStatus] = useState('Available');
  const [updating, setUpdating] = useState(false);

  const fetchInventory = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/v1/staff/me/inventory');
      const data = await res.json();
      if (res.ok && data.status === 'success') {
        setInventory(data.data || []);
        setTrainNumber(data.train_number || '22477');
      } else {
        setError(data.detail || 'Failed to fetch onboard train inventory.');
      }
    } catch (err) {
      setError('Network error fetching train inventory dataset.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleOpenUpdate = (item) => {
    setSelectedItem(item);
    setNewQuantity(item.quantity);
    setNewStatus(item.status);
    setShowUpdateModal(true);
  };

  const handleSaveUpdate = async (e) => {
    e.preventDefault();
    if (!selectedItem) return;

    setUpdating(true);
    try {
      const res = await fetch(`/api/v1/staff/me/inventory/${selectedItem.inventory_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: Number(newQuantity), status: newStatus })
      });
      const data = await res.json();
      if (res.ok && data.status === 'success') {
        setShowUpdateModal(false);
        setSelectedItem(null);
        fetchInventory();
      } else {
        alert(data.detail || 'Failed to update inventory record.');
      }
    } catch (err) {
      alert('Network error updating inventory.');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Banner Matching CMO Dashboard Header */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        border: '1px solid #e5e7eb',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: '#800020' }}>
            Onboard Train Inventory (Train {trainNumber})
          </h2>
          <p style={{ margin: '4px 0 0 0', fontSize: '0.88rem', color: '#6b7280' }}>
            Real-time tracking of passenger service supplies, linen kits, drinking water, first-aid, and catering stock.
          </p>
        </div>

        <button
          onClick={fetchInventory}
          style={{ padding: '8px 16px', backgroundColor: '#800020', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}
        >
          Refresh Stock
        </button>
      </div>

      {/* Inventory Table */}
      {loading ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>Loading onboard train inventory...</div>
      ) : error ? (
        <div style={{ padding: '20px', backgroundColor: '#fef2f2', color: '#991b1b', borderRadius: '8px' }}>{error}</div>
      ) : inventory.length === 0 ? (
        <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#ffffff', borderRadius: '12px', color: '#6b7280', border: '1px solid #e5e7eb' }}>
          No onboard inventory records found for Train {trainNumber}.
        </div>
      ) : (
        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
          {/* Desktop & Tablet Table */}
          <div className="hidden-on-mobile" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb', textAlign: 'left' }}>
                  <th style={{ padding: '14px 16px', color: '#374151', fontWeight: 700 }}>Item Name</th>
                  <th style={{ padding: '14px 16px', color: '#374151', fontWeight: 700 }}>Category</th>
                  <th style={{ padding: '14px 16px', color: '#374151', fontWeight: 700 }}>Available Quantity</th>
                  <th style={{ padding: '14px 16px', color: '#374151', fontWeight: 700 }}>Min Threshold</th>
                  <th style={{ padding: '14px 16px', color: '#374151', fontWeight: 700 }}>Stock Status</th>
                  <th style={{ padding: '14px 16px', color: '#374151', fontWeight: 700 }}>Last Updated</th>
                  <th style={{ padding: '14px 16px', color: '#374151', fontWeight: 700, textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => {
                  const isOut = item.status === 'Out of Stock' || item.quantity === 0;
                  const isLow = item.status === 'Low Stock' || item.quantity <= item.min_threshold;

                  return (
                    <tr key={item.inventory_id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '14px 16px', fontWeight: 800, color: '#111827' }}>
                        {item.item_name}
                      </td>
                      <td style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>
                        {item.category}
                      </td>
                      <td style={{ padding: '14px 16px', fontWeight: 800, fontSize: '0.95rem', color: isOut ? '#c5221f' : isLow ? '#b06000' : '#059669' }}>
                        {item.quantity} {item.unit}
                      </td>
                      <td style={{ padding: '14px 16px', color: '#6b7280' }}>
                        {item.min_threshold} {item.unit}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{
                          padding: '4px 12px',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          backgroundColor: isOut ? '#fee2e2' : isLow ? '#fef3c7' : '#d1fae5',
                          color: isOut ? '#991b1b' : isLow ? '#92400e' : '#065f46'
                        }}>
                          {isOut ? 'Out of Stock' : isLow ? 'Low Stock' : 'Available'}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', color: '#6b7280', fontSize: '0.82rem' }}>
                        {item.last_updated}
                      </td>
                      <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                        <button
                          type="button"
                          onClick={() => handleOpenUpdate(item)}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#800020',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '6px',
                            fontWeight: 700,
                            fontSize: '0.78rem',
                            cursor: 'pointer'
                          }}
                        >
                          Update Stock
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Inventory Cards */}
          <div className="visible-on-mobile" style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '12px' }}>
            {inventory.map((item) => {
              const isOut = item.status === 'Out of Stock' || item.quantity === 0;
              const isLow = item.status === 'Low Stock' || item.quantity <= item.min_threshold;

              return (
                <div
                  key={item.inventory_id}
                  style={{
                    backgroundColor: '#fafbfc',
                    border: '1px solid #e5e7eb',
                    borderRadius: '10px',
                    padding: '14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontWeight: 800, color: '#111827', fontSize: '0.95rem' }}>
                        {item.item_name}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#6b7280', marginTop: '2px' }}>
                        {item.category}
                      </div>
                    </div>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      backgroundColor: isOut ? '#fee2e2' : isLow ? '#fef3c7' : '#d1fae5',
                      color: isOut ? '#991b1b' : isLow ? '#92400e' : '#065f46'
                    }}>
                      {isOut ? 'Out of Stock' : isLow ? 'Low Stock' : 'Available'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', padding: '8px 12px', borderRadius: '6px', border: '1px solid #f0f0f0', fontSize: '0.85rem' }}>
                    <div>
                      <span style={{ color: '#6b7280' }}>Stock: </span>
                      <strong style={{ color: isOut ? '#c5221f' : isLow ? '#b06000' : '#059669', fontSize: '0.95rem' }}>
                        {item.quantity} {item.unit}
                      </strong>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#6b7280' }}>
                      Min: {item.min_threshold} {item.unit}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleOpenUpdate(item)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      backgroundColor: '#800020',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '6px',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    Update Quantity
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* UPDATE INVENTORY MODAL */}
      {showUpdateModal && selectedItem && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', width: '100%', maxWidth: '460px', padding: '24px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '1.2rem', fontWeight: 800, color: '#800020' }}>
              Update Stock - {selectedItem.item_name}
            </h3>
            <p style={{ margin: '0 0 16px 0', fontSize: '0.85rem', color: '#6b7280' }}>
              Category: {selectedItem.category} • Unit: {selectedItem.unit}
            </p>

            <form onSubmit={handleSaveUpdate}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                  Available Quantity ({selectedItem.unit}):
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.88rem', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                  Stock Status:
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.88rem' }}
                >
                  <option value="Available">Available</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setShowUpdateModal(false)}
                  style={{ padding: '10px 18px', backgroundColor: '#f3f4f6', color: '#374151', border: '1px solid #d1d5db', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  style={{ padding: '10px 20px', backgroundColor: '#800020', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}
                >
                  {updating ? 'Saving...' : 'Save Stock Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
