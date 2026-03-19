import React, { useState } from 'react';

const ROTATIONS = [-2.2, 2.8, -1.5, 3, -2.5, 1.8, -1, 2.3];

export default function PostitCard({ message, onEdit }) {
  const [hovered, setHovered] = useState(false);
  const rot = ROTATIONS[message.id % ROTATIONS.length];

  return (
    <div
      className={`postit-${message.color}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 4,
        padding: '20px 16px 16px',
        position: 'relative',
        cursor: 'pointer',
        minHeight: 200,
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        transform: hovered
          ? `rotate(${rot}deg) translateY(-8px) scale(1.04)`
          : `rotate(${rot}deg)`,
        transition: 'transform 0.2s cubic-bezier(.34,1.56,.64,1), box-shadow 0.2s',
        zIndex: hovered ? 20 : 1,
      }}
    >
      {/* 핀 */}
      <div className={`pin-${message.color}`} style={{
        position: 'absolute',
        top: -9, left: '50%',
        transform: 'translateX(-50%)',
        width: 14, height: 14,
        borderRadius: '50%',
        zIndex: 2,
        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
        border: '2px solid rgba(255,255,255,0.6)',
      }} />

      {/* 접힌 모서리 */}
      <div style={{
        position: 'absolute',
        bottom: 0, right: 0,
        width: 0, height: 0,
        borderStyle: 'solid',
        borderWidth: '0 0 22px 22px',
        borderColor: 'transparent transparent rgba(0,0,0,0.12) transparent',
      }} />

      {/* 내용 */}
      <div style={{ fontSize: 15, fontWeight: 800, color: '#6a4858', marginTop: 6 }}>
        {message.from}
      </div>

      {message.episode && (
        <div style={{
          fontSize: 11, color: '#a08878',
          background: 'rgba(255,255,255,0.5)',
          borderRadius: 6, padding: '4px 8px',
          lineHeight: 1.5,
        }}>
          💭 {message.episode}
        </div>
      )}

      <div style={{ fontSize: 13, color: '#3d2d38', lineHeight: 1.75, flex: 1, wordBreak: 'keep-all' }}>
        {message.message}
      </div>

      {/* 수정/삭제 버튼 */}
      <div style={{ display: 'flex', gap: 4, marginTop: 4, opacity: hovered ? 1 : 0, transition: 'opacity 0.15s' }}>
        <button onClick={onEdit} style={{
          fontSize: 10, padding: '2px 9px',
          borderRadius: 10, border: '1px solid rgba(0,0,0,0.1)',
          cursor: 'pointer', background: 'rgba(255,255,255,0.7)',
          color: '#6a4858', fontFamily: 'Nanum Gothic, sans-serif',
        }}>✏️ 수정</button>
        <button onClick={onEdit} style={{
          fontSize: 10, padding: '2px 9px',
          borderRadius: 10, border: '1px solid rgba(0,0,0,0.1)',
          cursor: 'pointer', background: 'rgba(255,255,255,0.7)',
          color: '#c05060', fontFamily: 'Nanum Gothic, sans-serif',
        }}>🗑 삭제</button>
      </div>

      <div style={{ fontSize: 10, color: 'rgba(80,50,60,0.45)', textAlign: 'right', marginTop: 4 }}>
        {message.createdAt ? new Date(message.createdAt).toLocaleDateString('ko-KR') : ''}
      </div>
    </div>
  );
}
