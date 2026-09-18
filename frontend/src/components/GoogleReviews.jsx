import React, { useState, useEffect } from 'react';
import { Star, ExternalLink, CheckCircle, MessageSquarePlus } from 'lucide-react';

export default function GoogleReviews() {
  const [reviewsData, setReviewsData] = useState({
    stats: {
      averageRating: 4.9,
      totalReviews: 24,
      googleProfileUrl: 'https://share.google/nDXFKdY4OcAeUelra',
      ratingLabel: 'Exceptional (4.9 / 5.0)',
      location: 'Rajajinagar & Indiranagar, Bangalore',
    },
    data: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/reviews')
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          setReviewsData(json);
        }
      })
      .catch(err => console.error('Error fetching reviews:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="reviews" className="reviews-section">
      <div className="container">
        <div className="text-center">
          {/* Google Trust Badge */}
          <div className="google-trust-badge">
            {/* Google G SVG */}
            <svg className="google-g-icon" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#fff' }}>
                Google Verified Reviews
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div className="star-rating-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#fbbf24" stroke="none" />
                  ))}
                </div>
                <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                  <strong>4.9 / 5.0</strong> ({reviewsData.stats.totalReviews}+ Client Reviews)
                </span>
              </div>
            </div>
          </div>

          <h2 className="section-title">
            What Clients Say About <span className="gradient-text">PC Creations</span>
          </h2>
          <p className="section-desc">
            Real feedback from business owners, startup founders, and retail brands in Bangalore and across India.
          </p>

          <div style={{ marginTop: '20px' }}>
            <a
              href="https://share.google/nDXFKdY4OcAeUelra"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
              style={{ display: 'inline-flex' }}
            >
              <span>View All Reviews on Google</span>
              <ExternalLink size={15} />
            </a>
          </div>
        </div>

        <div className="reviews-grid">
          {reviewsData.data.map((rev) => (
            <div key={rev.id || rev._id} className="review-card">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div className="star-rating-stars">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} size={16} fill="#fbbf24" stroke="none" />
                    ))}
                  </div>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>
                    <CheckCircle size={13} /> Verified
                  </span>
                </div>

                <p className="review-text">"{rev.text}"</p>
              </div>

              <div className="review-author-info">
                <div className="review-avatar">
                  {rev.avatar || 'PC'}
                </div>
                <div>
                  <div className="review-author-name">{rev.author}</div>
                  <div className="review-author-business">{rev.business}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
