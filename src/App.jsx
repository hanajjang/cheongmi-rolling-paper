import React, { useRef, useState } from 'react';
import useMessages from './hooks/useMessages';
import PostitCard from './components/PostitCard';
import WriteModal from './components/WriteModal';
import EditModal from './components/EditModal';
import SaveModal from './components/SaveModal';

export default function App() {
  const { messages, loading, error, refetch } = useMessages();
  const [showWrite, setShowWrite]   = useState(false);
  const [showSave, setShowSave]     = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const boardRef = useRef(null);

  return (
    <div style={{ minHeight: '100vh' }}>

      {/* 상단 무지개 줄 */}
      <div style={{
        height: 5,
        background: 'linear-gradient(90deg, #f4b8b0 0%, #f9d4a0 25%, #fce8b2 50%, #c8e6c9 75%, #b3d9f0 100%)'
      }} />

      {/* 헤더 */}
      <header style={{
        background: 'rgba(255,250,246,0.92)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(220,180,160,0.3)',
        padding: '16px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 44, height: 44,
            background: 'linear-gradient(135deg, #f4a89a, #e8798a)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22,
            boxShadow: '0 3px 12px rgba(232,121,138,0.35)',
          }}>🕊️</div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#7a4a5a' }}>
              주은지 부교님께 💌
            </div>
            <div style={{ fontSize: 11, color: '#c0968a', marginTop: 2 }}>
              청미 롤링페이퍼 🌸
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => setShowSave(true)} style={{
            background: '#fff',
            color: '#7a4a5a',
            border: '1.5px solid #e8798a',
            borderRadius: 20,
            padding: '9px 18px',
            fontSize: 13,
            fontFamily: 'Nanum Gothic, sans-serif',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6,
            boxShadow: '0 2px 8px rgba(232,121,138,0.2)',
          }}>
            🖼️ 이미지 저장
          </button>
          <button onClick={() => setShowWrite(true)} style={{
            background: 'linear-gradient(135deg, #e8798a, #d4607a)',
            color: '#fff',
            border: 'none',
            borderRadius: 20,
            padding: '9px 20px',
            fontSize: 13,
            fontFamily: 'Nanum Gothic, sans-serif',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6,
            boxShadow: '0 3px 12px rgba(212,96,122,0.4)',
          }}>
            ✏️ 마음 남기기
          </button>
        </div>
      </header>

      {/* 히어로 */}
      <div style={{ textAlign: 'center', padding: '36px 20px 24px' }}>
        <div style={{ fontSize: 11, color: '#c0968a', letterSpacing: '1.5px', marginBottom: 12, fontWeight: 700 }}>
          안산 주성령 청미 · 은지 부교님 이임 롤링페이퍼 · 2026
        </div>
        <div style={{ fontSize: 28, fontWeight: 800, color: '#7a4a5a', lineHeight: 1.35, marginBottom: 12 }}>
          사랑하는 <span style={{ color: '#e8798a' }}>은지 부교님</span>께<br />
          전하는 우리의 마음 💌
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, margin: '16px 0 12px' }}>
          <div style={{ height: 1, width: 80, background: 'linear-gradient(90deg, transparent, #d8b8b0)' }} />
          <span style={{ fontSize: 18 }}>🌸</span>
          <div style={{ height: 1, width: 80, background: 'linear-gradient(90deg, #d8b8b0, transparent)' }} />
        </div>
        <p style={{ fontSize: 12, color: '#a88880', fontStyle: 'italic', maxWidth: 400, margin: '0 auto', lineHeight: 1.7 }}>
          "너희 안에서 착한 일을 시작하신 이가 그리스도 예수의 날까지 이루실 줄을 우리는 확신하노라" — 빌 1:6
        </p>
      </div>

      {/* 보드 */}
      <div style={{ padding: '4px 24px 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#a07870' }}>💌 청미들의 메시지</span>
          <span style={{
            background: '#e8798a', color: '#fff',
            borderRadius: 20, padding: '1px 9px',
            fontSize: 11, fontWeight: 700,
          }}>{messages.length}</span>
          <div style={{ flex: 1, height: 1, background: 'repeating-linear-gradient(90deg, #d8c0b8 0px, #d8c0b8 5px, transparent 5px, transparent 10px)', opacity: 0.6 }} />
        </div>

        {/* 로딩 */}
        {loading && (
          <div style={{ textAlign: 'center', padding: 60, color: '#c0968a', fontSize: 15 }}>
            💌 메시지 불러오는 중...
          </div>
        )}

        {/* 에러 */}
        {error && (
          <div style={{ textAlign: 'center', padding: 60, color: '#e8798a', fontSize: 14 }}>
            연결에 실패했어요. 잠시 후 다시 시도해주세요.
          </div>
        )}

        {/* 카드 보드 */}
        {!loading && !error && (
          <div ref={boardRef} style={{
            background: 'rgba(255,248,242,0.7)',
            border: '1.5px dashed #d8c0b0',
            borderRadius: 16,
            padding: '24px 20px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 22,
            minHeight: 460,
            alignContent: 'start',
          }}>
            {messages.length === 0 ? (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: 60, color: '#c0a898', fontSize: 14 }}>
                아직 메시지가 없어요. 첫 번째로 마음을 남겨보세요 💌
              </div>
            ) : (
              messages.map((msg) => (
                <PostitCard
                  key={msg.id}
                  message={msg}
                  onEdit={() => setEditTarget(msg)}
                />
              ))
            )}
          </div>
        )}
      </div>

      {/* 푸터 */}
      <div style={{
        textAlign: 'center', padding: 20,
        fontSize: 11, color: '#c0a898',
        borderTop: '1px dashed #e8d8d0',
        marginTop: 20,
      }}>
        🕊️ 안산 주성령 청미 · 은지 부교님 이임 롤링페이퍼 · 2026
      </div>

      {/* 모달들 */}
      {showWrite && (
        <WriteModal
          onClose={() => setShowWrite(false)}
          onSuccess={() => { setShowWrite(false); refetch(); }}
        />
      )}
      {editTarget && (
        <EditModal
          message={editTarget}
          onClose={() => setEditTarget(null)}
          onSuccess={() => { setEditTarget(null); refetch(); }}
        />
      )}
      {showSave && (
        <SaveModal
          boardRef={boardRef}
          onClose={() => setShowSave(false)}
        />
      )}
    </div>
  );
}
