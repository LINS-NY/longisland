// src/components/ContactUs/ContactUs.jsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { MdEmail, MdPhone, MdLocationOn, MdAccessTime } from 'react-icons/md';

/* ---------- Small local replacement for missing PhoneInfo component ---------- */
function PhoneBadge({ className }) {
  const phone = '+1 (718) 974-7252';
  return <span className={className ?? 'font-medium text-blue-600'}>{phone}</span>;
}

/* ---------- Styled primitives ---------- */

const Container = styled.section`
  max-width: 980px;
  margin: 2.5rem auto;
  background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);
  border-radius: 12px;
  padding: 28px;
  box-shadow: 0 6px 20px rgba(17,24,39,0.06);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 20px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

/* Buttons and actions */
const PrimaryButton = styled.button`
  padding: 10px 16px;
  color: white;
  font-size: 15px;
  font-weight: 600;
  border-radius: 8px;
  background: linear-gradient(135deg, #007BFF, #00BFFF);
  box-shadow: 0 6px 18px rgba(0, 123, 255, 0.12);
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  white-space: nowrap;

  &:hover { transform: translateY(-2px); box-shadow: 0 10px 26px rgba(0,123,255,0.14); }
  &:focus { outline: 3px solid rgba(0,123,255,0.18); }
`;

const PrimaryAnchor = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  color: white;
  font-size: 15px;
  font-weight: 600;
  border-radius: 8px;
  background: linear-gradient(135deg, #007BFF, #00BFFF);
  box-shadow: 0 6px 18px rgba(0, 123, 255, 0.12);
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;

  &:hover { transform: translateY(-2px); box-shadow: 0 10px 26px rgba(0,123,255,0.14); }
  &:focus { outline: 3px solid rgba(0,123,255,0.18); }
`;

const SecondaryButton = styled.button`
  padding: 8px 12px;
  background: #ffffff;
  color: #0f172a;
  box-shadow: 0 2px 6px rgba(2,6,23,0.06);
  border: 1px solid #e6eefc;
  gap: 8px;
  display: inline-flex;
  align-items: center;
  border-radius: 8px;
  cursor: pointer;

  &:hover { transform: translateY(-1px); }
`;

const ContactCard = styled.div`
  display:flex;
  gap:12px;
  background: #fff;
  border-radius: 10px;
  padding: 12px;
  align-items: center;
  border: 1px solid #eef6ff;
`;

const CardText = styled.div`
  line-height: 1;
  > .title { font-weight: 700; color:#0f172a; font-size:14px; }
  > .sub { font-size:13px; color:#475569; margin-top:4px; }
`;

/* map placeholder */
const MapBox = styled.div`
  width:100%;
  border-radius:10px;
  height:180px;
  background: linear-gradient(90deg, #eef6ff 0%, #ffffff 100%);
  border:1px dashed #dbeafe;
  display:flex;
  align-items:center;
  justify-content:center;
  color:#0f172a;
  font-size:14px;
`;

/* Actions wrapper: responsive and prevents shrinking */
const ActionsWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;        /* allow wrapping on small screens */
  white-space: normal;
  overflow: visible;

  /* Optional single-line fallback with horizontal scrolling:
  @media (max-width: 420px) {
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  */
`;

const ActionItem = styled.div`
  position: relative;
  flex: 0 0 auto; /* do not shrink */
`;

/* Small note */
const SmallNote = styled.p`
  font-size:13px;
  color:#64748B;
  margin:0;
`;

/* ---------- Component (no form) ---------- */

export default function ContactUs() {
  const [showOptions, setShowOptions] = useState(false);
  const menuRef = useRef(null);
  const phoneButtonRef = useRef(null);

  const toggleOptions = () => setShowOptions(s => !s);

  const handleEmailClick = () => {
    const subject = encodeURIComponent('LINS Website: Member Inquiry. Executive Members Please Respond ASAP');
    // NOTE: change address here if needed (longislandnepalese@gmail.com vs lognisland...)
    window.location.href = `mailto:longislandnepalese@gmail.com?subject=${subject}`;
  };

  const handleCallClick = () => {
    window.location.href = 'tel:+17189747252';
  };

  // close menu when clicking outside
  useEffect(() => {
    function onDoc(e) {
      if (!menuRef.current) return;
      if (menuRef.current.contains(e.target) || (phoneButtonRef.current && phoneButtonRef.current.contains(e.target))) return;
      setShowOptions(false);
    }
    if (showOptions) document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [showOptions]);

  return (
    <Container aria-labelledby="contact-heading">
      <header style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:12, marginBottom:8 }}>
        <div>
          <h2 id="contact-heading" style={{ margin:0, fontSize:22, color:'#0f172a' }}>Contact Us</h2>
          <SmallNote>We’re here to help — use a quick action below or call us directly during business hours.</SmallNote>
        </div>

        <ActionsWrapper>
          <ActionItem ref={phoneButtonRef}>
            <PrimaryButton
              aria-expanded={showOptions}
              aria-controls="contact-options"
              onClick={toggleOptions}
              aria-haspopup="menu"
            >
              <MdPhone size={16} className="text-white" />
              <span style={{ fontWeight: 600 }}>+1 (718) 974-7252</span>
            </PrimaryButton>

            {showOptions && (
              <div
                id="contact-options"
                role="menu"
                ref={menuRef}
                style={{
                  position:'absolute',
                  right:0,
                  top:'110%',
                  marginTop:8,
                  background:'#fff',
                  border:'1px solid #e6eefc',
                  borderRadius:10,
                  boxShadow:'0 10px 30px rgba(2,6,23,0.06)',
                  padding:8,
                  zIndex:60,
                  minWidth:220
                }}
              >
                <div role="menuitem" style={{ marginBottom:6 }}>
                  <SecondaryButton onClick={handleEmailClick}><MdEmail size={18} /> <span style={{ marginLeft:6 }}>Email Us</span></SecondaryButton>
                </div>
                <div role="menuitem">
                  <SecondaryButton onClick={handleCallClick}><MdPhone size={18} /> <span style={{ marginLeft:6 }}><PhoneBadge /></span></SecondaryButton>
                </div>
              </div>
            )}
          </ActionItem>

          <ActionItem>
            <PrimaryAnchor href="/MembershipForm" title="Join LINS">
              <MdJoinIconPlaceholder />
              <span style={{ fontWeight: 600 }}>Join LINS</span>
            </PrimaryAnchor>
          </ActionItem>
        </ActionsWrapper>
      </header>

      <Grid>
        {/* Left: summary / optional description */}
        <div>
          <ContactCard>
            <MdLocationOn size={28} color="#0f172a" />
            <CardText>
              <div className="title">Long Island Nepalese Society (LINS-NY)</div>
              <div className="sub">Hicksville / Nassau County, NY</div>
            </CardText>
          </ContactCard>

          <div style={{ height: 12 }} />

          <ContactCard>
            <MdPhone size={28} color="#0f172a" />
            <CardText>
              <div className="title">Phone</div>
              <div className="sub"><a href="tel:+17189747252" style={{ color:'#007BFF', textDecoration:'none' }}>+1 (718) 974-7252</a></div>
            </CardText>
          </ContactCard>

          <ContactCard>
            <MdEmail size={28} color="#0f172a" />
            <CardText>
              <div className="title">Email</div>
              <div className="sub"><a href="mailto:longislandnepalese@gmail.com" style={{ color:'#007BFF', textDecoration:'none' }}>longislandnepalese@gmail.com</a></div>
            </CardText>
          </ContactCard>

          <ContactCard>
            <MdAccessTime size={28} color="#0f172a" />
            <CardText>
              <div className="title">Hours</div>
              <div className="sub">Mon - Fri: 9:00 AM – 5:00 PM</div>
            </CardText>
          </ContactCard>

          <div style={{ marginTop: 12 }}>
            <SmallNote>For urgent matters, please call. We respect your privacy — messages are used only to respond to inquiries.</SmallNote>
          </div>
        </div>

        {/* Right: map placeholder */}
        <aside>
          <MapBox aria-hidden>Map placeholder — replace with Google Maps iframe or Leaflet map</MapBox>
        </aside>
      </Grid>
    </Container>
  );
}

/* ---------- small icon placeholders (replace with imported icons if you prefer) ---------- */

function MdJoinIconPlaceholder() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginRight: 6 }} aria-hidden>
      <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
