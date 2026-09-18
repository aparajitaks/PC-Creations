import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, Clock, BookOpen, Star, ArrowRight, ShieldCheck, 
  ChevronDown, ChevronUp, PlayCircle, CheckCircle2, Award, Sparkles 
} from 'lucide-react';

export default function AcademySection({ onOpenAuthModal, onOpenDashboard, onSelectCourse, user }) {
  const [courses, setCourses] = useState([]);
  const [expandedSyllabusCourseId, setExpandedSyllabusCourseId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/courses')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCourses(data.data);
        }
      })
      .catch(err => console.error('Failed to fetch courses:', err))
      .finally(() => setLoading(false));
  }, []);

  const toggleSyllabus = (courseId) => {
    setExpandedSyllabusCourseId(prev => prev === courseId ? null : courseId);
  };

  const handleCourseAction = (courseId) => {
    if (user) {
      // User is logged in, jump directly to player or dashboard
      if (onSelectCourse) {
        onSelectCourse(courseId);
      } else if (onOpenDashboard) {
        onOpenDashboard();
      }
    } else {
      // User is not logged in, prompt Auth modal
      onOpenAuthModal();
    }
  };

  return (
    <section id="academy" className="academy-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-row">
          <div className="section-header-left">
            <div className="badge-pill">
              <GraduationCap size={16} />
              <span>PC CREATIONS ACADEMY • BANGALORE</span>
            </div>
            <h2 className="section-title">
              Agency Masterclasses & <span className="gradient-text">LMS Portal</span>
            </h2>
            <p className="section-subtitle">
              Learn the exact frameworks, video production pipelines, and ad scaling strategies our agency uses daily for Bangalore's top brands. Only authorized students receive full video & certificate access.
            </p>
          </div>

          <div className="section-header-action">
            {user ? (
              <button 
                className="btn btn-primary"
                onClick={onOpenDashboard}
              >
                <span>Go to My LMS Dashboard</span>
                <ArrowRight size={18} />
              </button>
            ) : (
              <button 
                className="btn btn-primary"
                onClick={onOpenAuthModal}
              >
                <span>Access Student Portal</span>
                <ShieldCheck size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Courses Grid */}
        {loading ? (
          <div className="academy-loading">
            <div className="spinner"></div>
            <p>Loading agency courses...</p>
          </div>
        ) : (
          <div className="academy-cards-grid">
            {courses.map(course => {
              const isSyllabusOpen = expandedSyllabusCourseId === course.id;

              return (
                <div key={course.id} className="academy-course-card">
                  {/* Card Header Top */}
                  <div className="academy-card-meta">
                    <span className="academy-category-pill">{course.category}</span>
                    <span className={`academy-badge-tag ${course.badge?.toLowerCase()}`}>
                      {course.badge}
                    </span>
                  </div>

                  {/* Course Title & Summary */}
                  <h3 className="academy-course-title">{course.title}</h3>
                  <p className="academy-course-tagline">{course.tagline}</p>

                  {/* Metrics Bar */}
                  <div className="academy-specs-row">
                    <span className="academy-spec-item">
                      <Clock size={15} />
                      {course.duration}
                    </span>
                    <span className="academy-spec-item">
                      <BookOpen size={15} />
                      {course.totalLessons} Lessons
                    </span>
                    <span className="academy-spec-item">
                      <Star size={15} className="star-icon-filled" />
                      {course.rating} ({course.ratingCount})
                    </span>
                  </div>

                  {/* Learning Outcomes Checklist */}
                  <div className="academy-outcomes-container">
                    <span className="academy-outcomes-header">Key Skills You Gain:</span>
                    <ul className="academy-outcomes-list">
                      {course.learningOutcomes.slice(0, 3).map((item, idx) => (
                        <li key={idx}>
                          <CheckCircle2 size={15} className="academy-check-icon" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Instructor Block */}
                  <div className="academy-instructor-card">
                    <div className="academy-inst-avatar">
                      {course.instructor.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="academy-inst-meta">
                      <strong>{course.instructor.name}</strong>
                      <span>{course.instructor.title}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="academy-card-buttons">
                    <button 
                      className="btn btn-outline btn-sm academy-syllabus-btn"
                      onClick={() => toggleSyllabus(course.id)}
                    >
                      <span>{isSyllabusOpen ? 'Hide Syllabus' : 'View Syllabus Preview'}</span>
                      {isSyllabusOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>

                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => handleCourseAction(course.id)}
                    >
                      <span>{user ? 'Enter Course Player' : 'Unlock Access'}</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>

                  {/* Expandable Syllabus Preview */}
                  {isSyllabusOpen && (
                    <div className="academy-syllabus-drawer">
                      <div className="academy-syllabus-header">
                        <h4>Full Curriculum Modules</h4>
                        <span className="academy-syllabus-count">{course.modules?.length} Modules</span>
                      </div>
                      <div className="academy-syllabus-modules">
                        {course.modules?.map((mod, modIdx) => (
                          <div key={mod.id || modIdx} className="academy-module-snippet">
                            <div className="academy-module-title-row">
                              <span className="academy-mod-label">Mod {modIdx + 1}</span>
                              <span className="academy-mod-name">{mod.title.replace(/^Module \d+:\s*/, '')}</span>
                              <span className="academy-mod-dur">{mod.duration}</span>
                            </div>
                            <ul className="academy-module-lessons">
                              {mod.lessons?.map((les, lesIdx) => (
                                <li key={les.id || lesIdx} className="academy-lesson-snippet">
                                  <PlayCircle size={14} className={les.isFreePreview ? 'text-preview' : 'text-locked'} />
                                  <span className="academy-les-title">{les.title}</span>
                                  {les.isFreePreview ? (
                                    <span className="academy-free-tag">Free Preview</span>
                                  ) : (
                                    <span className="academy-locked-tag">🔒 Enrolled Only</span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* LMS Access Bottom Banner */}
        <div className="academy-lms-cta-card">
          <div className="academy-cta-left">
            <div className="academy-cta-badge">
              <Sparkles size={16} />
              <span>Authorized Access Portal</span>
            </div>
            <h3>Authorized Student or Agency Intern?</h3>
            <p>
              Log in to track your video lessons, mark progress, submit practical campaign briefs, and earn verified PC Creations credentials. Test the portal instantly using our 1-click demo student account.
            </p>
          </div>
          <div className="academy-cta-actions">
            <button 
              className="btn btn-primary"
              onClick={onOpenAuthModal}
            >
              <ShieldCheck size={18} />
              <span>Student Sign In / 1-Click Demo</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
