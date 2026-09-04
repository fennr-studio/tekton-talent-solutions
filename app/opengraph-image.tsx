import { ImageResponse } from 'next/og';
import { site } from '@/data/site';

export const alt = `${site.name} — technology recruitment and IT services`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Generated at build time; no design file to keep in sync. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0A0A0C',
          color: '#EFEAE0',
          padding: '72px',
        }}
      >
        <div style={{ display: 'flex', fontSize: 30, letterSpacing: '-0.02em' }}>
          Tekton<span style={{ color: '#7C6BFF' }}>.</span>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 82,
            lineHeight: 1.02,
            letterSpacing: '-0.035em',
            maxWidth: 900,
          }}
        >
          Empowering enterprise growth with India&rsquo;s tech advantage
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 24,
            color: '#B6B0A3',
            borderTop: '1px solid #26262E',
            paddingTop: '28px',
          }}
        >
          <span>Hyderabad · PAN India</span>
          <span>CMMI Level 3 · ISO 9001:2015</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
