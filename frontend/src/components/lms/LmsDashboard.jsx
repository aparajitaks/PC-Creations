import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Play, CheckCircle2, Clock, Award, LogOut, ArrowLeft, 
  Sparkles, ExternalLink, ChevronRight, UserCircle, Star, Shield, ArrowUpRight
} from 'lucide-react';

export default function LmsDashboard({ 
  user, 
  token, 
  onLogout, 
  onReturnToHome, 
  onOpenCoursePlayer 
}) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('enrolled'); // 'enrolled' | 'all'
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourses();
  }, [token]);

  const fetchCourses = async () => {
    setLoading(true);
    setError('');
    try {
      const headers = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch('/api/courses', { headers });
      const data = await res.json();
      if (data.success) {
        setCourses(data.data);
      } else {
        setError(data.message || 'Failed to load courses');
      }
    } catch (err) {
      setError('Could not connect to courses API');
    } finally {
      setLoading(false);
    }
  };

  // Helper to find enrollment data for a course
  const getEnrollment = (courseId) => {
    return user?.enrolledCourses?.find(c => c.courseId === courseId);
  };

  const enrolledCourseIds = user?.enrolledCourses?.map(c => c.courseId) || [];
  const enrolledCourses = courses.filter(c => enrolledCourseIds.includes(c.id));
  const displayedCourses = activeTab === 'enrolled' ? enrolledCourses : courses;

  // Calculate student stats
  const totalEnrolled = enrolledCourses.length;
  const totalLessonsDone = user?.enrolledCourses?.reduce(
    (acc, curr) => acc + (curr.completedLessons?.length || 0), 0
  ) || 0;
  const avgProgress = totalEnrolled > 0
    ? Math.round(
        user.enrolledCourses.reduce((acc, curr) => acc + (curr.progress || 0), 0) / totalEnrolled
      )
    : 0;
  const completedCoursesCount = user?.enrolledCourses?.filter(c => c.isCompleted).length || 0;

  return (
    <div className="lms-dashboard-wrapper">
      {/* Dashboard Navigation Bar */}
      <nav className="lms-nav-bar">
        <div className="container lms-nav-content">
          <div className="lms-nav-left">
            <button 
              className="btn btn-outline btn-sm lms-back-home-btn"
              onClick={onReturnToHome}
            >
              <ArrowLeft size={16} />
              <span>Agency Home</span>
            </button>
            <div className="lms-portal-branding">
              <span className="lms-portal-logo-tag">PC CREATIONS</span>
              <span className="lms-portal-subtitle">Student Learning Portal</span>
            </div>
          </div>

          <div className="lms-nav-right">
            <div className="lms-student-badge">
              <div className="lms-student-avatar">
                {user?.avatar || (user?.name ? user.name.slice(0, 2).toUpperCase() : 'ST')}
              </div>
              <div className="lms-student-meta">
                <span className="lms-student-name">{user?.name || 'Enrolled Student'}</span>
                <span className="lms-student-role">
                  <Shield size={12} />
                  {user?.role === 'admin' ? 'Administrator' : 'Verified Student'}
                </span>
              </div>
            </div>

            <button 
              className="btn btn-ghost btn-sm lms-logout-btn" 
              onClick={onLogout}
              title="Sign Out"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="container lms-dashboard-main">
        {/* Welcome Hero Banner */}
        <section className="lms-welcome-banner">
          <div className="lms-welcome-info">
            <div className="lms-banner-pill">
              <Sparkles size={14} />
              <span>Academy Access Active</span>
            </div>
            <h1>Welcome back, {user?.name ? user.name.split(' ')[0] : 'Learner'}! 🚀</h1>
            <p>
              Continue your journey to master digital marketing, video production, and agency-scale client acquisition with Bangalore's leading marketing agency.
            </p>
          </div>

          {/* Quick Metrics Cards */}
          <div className="lms-stats-grid">
            <div className="lms-stat-card">
              <div className="lms-stat-icon-wrapper">
                <BookOpen size={20} />
              </div>
              <div className="lms-stat-number">{totalEnrolled}</div>
              <div className="lms-stat-label">Enrolled Courses</div>
            </div>

            <div className="lms-stat-card">
              <div className="lms-stat-icon-wrapper">
                <CheckCircle2 size={20} />
              </div>
              <div className="lms-stat-number">{totalLessonsDone}</div>
              <div className="lms-stat-label">Completed Lessons</div>
            </div>

            <div className="lms-stat-card">
              <div className="lms-stat-icon-wrapper">
                <Clock size={20} />
              </div>
              <div className="lms-stat-number">{avgProgress}%</div>
              <div className="lms-stat-label">Average Progress</div>
            </div>

            <div className="lms-stat-card">
              <div className="lms-stat-icon-wrapper">
                <Award size={20} />
              </div>
              <div className="lms-stat-number">{completedCoursesCount}</div>
              <div className="lms-stat-label">Certifications</div>
            </div>
          </div>
        </section>

        {/* Tab Controls */}
        <div className="lms-tabs-header">
          <div className="lms-tabs-switch">
            <button 
              className={`lms-tab-btn ${activeTab === 'enrolled' ? 'active' : ''}`}
              onClick={() => setActiveTab('enrolled')}
            >
              My Registered Courses ({enrolledCourses.length})
            </button>
            <button 
              className={`lms-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Academy Catalog ({courses.length})
            </button>
          </div>
        </div>

        {/* Courses Listing */}
        {loading ? (
          <div className="lms-loading-container">
            <div className="spinner"></div>
            <p>Loading course dashboard...</p>
          </div>
        ) : error ? (
          <div className="lms-error-box">
            <p>{error}</p>
            <button className="btn btn-primary btn-sm" onClick={fetchCourses}>Retry</button>
          </div>
        ) : displayedCourses.length === 0 ? (
          <div className="lms-empty-state">
            <BookOpen size={48} className="lms-empty-icon" />
            <h3>No enrolled courses yet</h3>
            <p>Browse our full academy catalog to get started with hands-on marketing cohorts.</p>
            <button 
              className="btn btn-primary"
              onClick={() => setActiveTab('all')}
            >
              Explore Academy Courses
            </button>
          </div>
        ) : (
          <div className="lms-courses-grid">
            {displayedCourses.map(course => {
              const enrollment = getEnrollment(course.id);
              const isEnrolled = !!enrollment;
              const progress = enrollment?.progress || 0;

              return (
                <div key={course.id} className="lms-course-card">
                  <div className="lms-card-top">
                    <div className="lms-course-badges">
                      <span className="lms-tag-badge">{course.category}</span>
                      {course.badge && (
                        <span className={`lms-status-badge ${course.badge.toLowerCase()}`}>
                          {course.badge}
                        </span>
                      )}
                    </div>
                    <div className="lms-course-rating">
                      <Star size={14} className="star-icon-filled" />
                      <span>{course.rating}</span>
                      <small>({course.ratingCount})</small>
                    </div>
                  </div>

                  <h3 className="lms-course-title">{course.title}</h3>
                  <p className="lms-course-tagline">{course.tagline}</p>

                  <div className="lms-course-specs">
                    <span><Clock size={14} /> {course.duration}</span>
                    <span><BookOpen size={14} /> {course.totalLessons} Lessons</span>
                    <span>{course.level}</span>
                  </div>

                  {/* Progress section for enrolled */}
                  {isEnrolled ? (
                    <div className="lms-course-progress-block">
                      <div className="lms-progress-label-row">
                        <span>Course Progress</span>
                        <strong>{progress}%</strong>
                      </div>
                      <div className="lms-progress-track">
                        <div 
                          className="lms-progress-bar-fill" 
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <div className="lms-course-outcomes-snippet">
                      <p className="lms-outcomes-title">What you'll master:</p>
                      <ul className="lms-outcomes-list">
                        {course.learningOutcomes.slice(0, 2).map((outcome, idx) => (
                          <li key={idx}>
                            <CheckCircle2 size={14} />
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="lms-card-footer">
                    <div className="lms-instructor-info">
                      <div className="lms-inst-avatar">
                        {course.instructor.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <span className="lms-inst-name">{course.instructor.name}</span>
                        <span className="lms-inst-title">{course.instructor.title}</span>
                      </div>
                    </div>

                    <button 
                      className={`btn btn-sm ${isEnrolled ? 'btn-primary' : 'btn-outline'}`}
                      onClick={() => onOpenCoursePlayer(course.id)}
                    >
                      {isEnrolled ? (
                        <>
                          <Play size={16} />
                          <span>{progress > 0 ? 'Resume' : 'Start'}</span>
                        </>
                      ) : (
                        <>
                          <span>Access Course</span>
                          <ArrowUpRight size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
