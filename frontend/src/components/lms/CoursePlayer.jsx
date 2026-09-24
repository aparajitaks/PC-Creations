import React, { useState, useEffect } from 'react';
import API_BASE from '../../config/api';
import { 
  ArrowLeft, CheckCircle2, Circle, PlayCircle, Lock, ChevronDown, 
  ChevronUp, Award, Clock, BookOpen, User, Check, ExternalLink,
  Sparkles, Download, Volume2, Maximize2, RotateCcw
} from 'lucide-react';

export default function CoursePlayer({ courseId, token, user, onBackToDashboard, onUpdateUser }) {
  const [course, setCourse] = useState(null);
  const [userProgress, setUserProgress] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [savingProgress, setSavingProgress] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    fetchCourseDetails();
  }, [courseId]);

  const fetchCourseDetails = async () => {
    setLoading(true);
    setError('');
    try {
      const headers = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${API_BASE}/api/courses/${courseId}`, { headers });
      const data = await res.json();

      if (data.success) {
        setCourse(data.data);
        setUserProgress(data.userProgress);

        // Find initial lesson to play: either last accessed lesson, or first uncompleted, or first lesson
        const allLessons = [];
        data.data.modules.forEach(m => {
          m.lessons.forEach(l => allLessons.push(l));
        });

        if (allLessons.length > 0) {
          let target = allLessons[0];
          if (data.userProgress?.lastAccessedLesson) {
            const last = allLessons.find(l => l.id === data.userProgress.lastAccessedLesson);
            if (last) target = last;
          }
          setCurrentLesson(target);
          // find module index of target
          const modIdx = data.data.modules.findIndex(m => m.lessons.some(l => l.id === target.id));
          if (modIdx !== -1) setActiveModuleIndex(modIdx);
        }
      } else {
        setError(data.message || 'Failed to load course details');
      }
    } catch (err) {
      setError('Error connecting to course server');
    } finally {
      setLoading(false);
    }
  };

  const isLessonCompleted = (lessonId) => {
    return userProgress?.completedLessons?.includes(lessonId) || false;
  };

  const handleSelectLesson = (lesson, moduleIdx) => {
    setCurrentLesson(lesson);
    setActiveModuleIndex(moduleIdx);
    setIsPlaying(false);
  };

  const handleMarkComplete = async () => {
    if (!currentLesson || !token) return;
    setSavingProgress(true);

    try {
      const res = await fetch(`${API_BASE}/api/courses/${courseId}/progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          lessonId: currentLesson.id,
          completed: true
        })
      });
      const data = await res.json();

      if (data.success) {
        setUserProgress(data.data);
        if (onUpdateUser) {
          // Update parent user state if needed
          const updatedUser = { ...user };
          const courseEnrolled = updatedUser.enrolledCourses?.find(c => c.courseId === courseId);
          if (courseEnrolled) {
            courseEnrolled.progress = data.data.progress;
            courseEnrolled.completedLessons = data.data.completedLessons;
            courseEnrolled.isCompleted = data.data.isCompleted;
          }
          onUpdateUser(updatedUser);
        }

        // Check if finished 100%
        if (data.data.isCompleted) {
          setShowCertificate(true);
        } else {
          // Automatically advance to next lesson if available
          moveToNextLesson();
        }
      }
    } catch (err) {
      console.error('Failed to mark lesson complete:', err);
    } finally {
      setSavingProgress(false);
    }
  };

  const moveToNextLesson = () => {
    if (!course || !currentLesson) return;
    const allLessons = [];
    course.modules.forEach(m => m.lessons.forEach(l => allLessons.push(l)));
    const currentIndex = allLessons.findIndex(l => l.id === currentLesson.id);
    if (currentIndex !== -1 && currentIndex < allLessons.length - 1) {
      const nextLesson = allLessons[currentIndex + 1];
      setCurrentLesson(nextLesson);
      const modIdx = course.modules.findIndex(m => m.lessons.some(l => l.id === nextLesson.id));
      if (modIdx !== -1) setActiveModuleIndex(modIdx);
      setIsPlaying(false);
    }
  };

  const moveToPrevLesson = () => {
    if (!course || !currentLesson) return;
    const allLessons = [];
    course.modules.forEach(m => m.lessons.forEach(l => allLessons.push(l)));
    const currentIndex = allLessons.findIndex(l => l.id === currentLesson.id);
    if (currentIndex > 0) {
      const prevLesson = allLessons[currentIndex - 1];
      setCurrentLesson(prevLesson);
      const modIdx = course.modules.findIndex(m => m.lessons.some(l => l.id === prevLesson.id));
      if (modIdx !== -1) setActiveModuleIndex(modIdx);
      setIsPlaying(false);
    }
  };

  if (loading) {
    return (
      <div className="lms-player-loading">
        <div className="spinner"></div>
        <p>Loading course curriculum & video assets...</p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="lms-player-error-state">
        <h2>Unable to load course</h2>
        <p>{error || 'Course not found'}</p>
        <button className="btn btn-primary" onClick={onBackToDashboard}>
          Return to Dashboard
        </button>
      </div>
    );
  }

  const currentModule = course.modules[activeModuleIndex];
  const progressPercent = userProgress?.progress || 0;
  const totalCompletedLessons = userProgress?.completedLessons?.length || 0;

  return (
    <div className="lms-player-layout">
      {/* Top Bar Navigation */}
      <header className="lms-player-header">
        <div className="lms-player-header-left">
          <button 
            className="lms-player-back-btn" 
            onClick={onBackToDashboard}
            title="Return to LMS Dashboard"
          >
            <ArrowLeft size={18} />
            <span>Dashboard</span>
          </button>
          <div className="lms-player-title-box">
            <span className="lms-player-badge">{course.category}</span>
            <h1 className="lms-player-course-title">{course.title}</h1>
          </div>
        </div>

        <div className="lms-player-header-right">
          <div className="lms-player-progress-widget">
            <div className="lms-player-progress-labels">
              <span>{totalCompletedLessons} / {course.totalLessons} Lessons</span>
              <span className="progress-percentage">{progressPercent}% Completed</span>
            </div>
            <div className="lms-player-progress-bar">
              <div 
                className="lms-player-progress-fill" 
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {progressPercent === 100 && (
            <button 
              className="btn btn-certificate-claim" 
              onClick={() => setShowCertificate(true)}
            >
              <Award size={18} />
              <span>Certificate</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Split Player View */}
      <div className="lms-player-body">
        {/* Left Side: Video Player & Content */}
        <div className="lms-player-stage">
          {/* Video Container */}
          <div className="lms-video-container">
            {currentLesson?.videoUrl && currentLesson.videoUrl.includes('youtube') ? (
              <div className="lms-video-iframe-wrapper">
                <iframe
                  src={currentLesson.videoUrl}
                  title={currentLesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <div className="lms-custom-video-screen">
                <div className="lms-video-backdrop">
                  <div className="lms-video-glow"></div>
                  <div className="lms-video-play-center">
                    <button 
                      className={`lms-play-trigger-btn ${isPlaying ? 'playing' : ''}`}
                      onClick={() => setIsPlaying(!isPlaying)}
                      aria-label="Play video lesson"
                    >
                      <PlayCircle size={68} />
                    </button>
                    <div className="lms-video-meta-overlay">
                      <span className="lms-video-instructor">
                        Instructor: {course.instructor.name} ({course.instructor.title})
                      </span>
                      <h3>{currentLesson?.title}</h3>
                      <span className="lms-video-duration-pill">
                        <Clock size={14} />
                        {currentLesson?.duration || '20m'} • HD 1080p
                      </span>
                    </div>
                  </div>
                </div>

                <div className="lms-video-mock-controls">
                  <button onClick={() => setIsPlaying(!isPlaying)} className="lms-ctrl-btn">
                    {isPlaying ? 'Pause' : 'Play'}
                  </button>
                  <div className="lms-mock-progress-track">
                    <div className="lms-mock-progress-fill" style={{ width: isPlaying ? '65%' : '20%' }}></div>
                  </div>
                  <div className="lms-ctrl-right">
                    <Volume2 size={18} />
                    <Maximize2 size={18} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Lesson Meta Bar & Actions */}
          <div className="lms-lesson-action-bar">
            <div className="lms-lesson-info">
              <span className="lms-lesson-module-tag">
                {currentModule ? currentModule.title : 'Course Module'}
              </span>
              <h2 className="lms-lesson-heading">{currentLesson?.title}</h2>
              <p className="lms-lesson-summary">{currentLesson?.description}</p>
            </div>

            <div className="lms-lesson-buttons">
              <button 
                className="btn btn-outline btn-sm"
                onClick={moveToPrevLesson}
              >
                Previous
              </button>

              <button 
                className={`btn btn-sm ${isLessonCompleted(currentLesson?.id) ? 'btn-secondary' : 'btn-primary'}`}
                onClick={handleMarkComplete}
                disabled={savingProgress}
              >
                {savingProgress ? (
                  <span>Saving...</span>
                ) : isLessonCompleted(currentLesson?.id) ? (
                  <>
                    <Check size={16} />
                    <span>Completed (Next)</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={16} />
                    <span>Mark Complete & Next</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Lesson Resources & Notes */}
          <div className="lms-lesson-extras-grid">
            <div className="lms-extra-card">
              <div className="lms-extra-header">
                <BookOpen size={18} />
                <h4>Lesson Resources & Frameworks</h4>
              </div>
              <ul className="lms-resources-list">
                <li>
                  <a href="#download" onClick={(e) => { e.preventDefault(); alert('Downloading template checklist...'); }}>
                    <Download size={15} />
                    <span>{course.id}-worksheet-template.pdf</span>
                  </a>
                </li>
                <li>
                  <a href="#doc" onClick={(e) => { e.preventDefault(); alert('Opening official agency swipe file...'); }}>
                    <ExternalLink size={15} />
                    <span>PC Creations Agency Swipe File (2025 Edition)</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="lms-extra-card">
              <div className="lms-extra-header">
                <User size={18} />
                <h4>Course Instructor</h4>
              </div>
              <div className="lms-instructor-mini">
                <div className="lms-instructor-avatar">
                  {course.instructor.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <strong>{course.instructor.name}</strong>
                  <p>{course.instructor.title} at {course.instructor.company}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Course Syllabus / Module Accordion Sidebar */}
        <aside className="lms-player-sidebar">
          <div className="lms-sidebar-header">
            <h3>Course Curriculum</h3>
            <span className="lms-sidebar-lesson-count">
              {totalCompletedLessons}/{course.totalLessons} Completed
            </span>
          </div>

          <div className="lms-module-accordion-list">
            {course.modules.map((module, modIndex) => {
              const isModuleExpanded = activeModuleIndex === modIndex;
              const moduleCompletedLessons = module.lessons.filter(l => isLessonCompleted(l.id)).length;

              return (
                <div 
                  key={module.id || modIndex} 
                  className={`lms-module-item ${isModuleExpanded ? 'open' : ''}`}
                >
                  <button 
                    className="lms-module-header-btn"
                    onClick={() => setActiveModuleIndex(isModuleExpanded ? -1 : modIndex)}
                  >
                    <div className="lms-module-header-info">
                      <span className="lms-module-index">Module {modIndex + 1}</span>
                      <h4 className="lms-module-title">{module.title.replace(/^Module \d+:\s*/, '')}</h4>
                      <span className="lms-module-stats">
                        {moduleCompletedLessons}/{module.lessons.length} done • {module.duration}
                      </span>
                    </div>
                    {isModuleExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>

                  {isModuleExpanded && (
                    <div className="lms-module-lessons-list">
                      {module.lessons.map((lesson, lessonIdx) => {
                        const isActive = currentLesson?.id === lesson.id;
                        const isDone = isLessonCompleted(lesson.id);

                        return (
                          <div 
                            key={lesson.id || lessonIdx}
                            className={`lms-lesson-item ${isActive ? 'active' : ''} ${isDone ? 'completed' : ''}`}
                            onClick={() => handleSelectLesson(lesson, modIndex)}
                          >
                            <div className="lms-lesson-item-left">
                              {isDone ? (
                                <CheckCircle2 size={17} className="lms-icon-done" />
                              ) : isActive ? (
                                <PlayCircle size={17} className="lms-icon-active" />
                              ) : (
                                <Circle size={17} className="lms-icon-pending" />
                              )}
                              <div className="lms-lesson-titles">
                                <span className="lms-lesson-title-text">{lesson.title}</span>
                                <span className="lms-lesson-duration">{lesson.duration}</span>
                              </div>
                            </div>

                            {lesson.isFreePreview && !isDone && (
                              <span className="lms-preview-badge">Preview</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>
      </div>

      {/* Certificate Modal on 100% completion */}
      {showCertificate && (
        <div className="modal-overlay lms-cert-overlay" onClick={() => setShowCertificate(false)}>
          <div className="modal-card lms-cert-card" onClick={(e) => e.stopPropagation()}>
            <div className="lms-cert-border">
              <div className="lms-cert-inner">
                <div className="lms-cert-badge-glow">
                  <Award size={48} />
                </div>
                <span className="lms-cert-sub">CERTIFICATE OF ACHIEVEMENT</span>
                <h2 className="lms-cert-main-title">PC Creations Academy Bangalore</h2>
                
                <p className="lms-cert-text">This is proudly presented to</p>
                <div className="lms-cert-student-name">
                  {user?.name || 'Enrolled Student'}
                </div>
                <p className="lms-cert-body">
                  for successfully mastering and completing all modules and practical assessments in
                </p>
                <h3 className="lms-cert-course-name">{course.title}</h3>
                
                <div className="lms-cert-meta-row">
                  <div>
                    <span className="lms-cert-label">Instructor</span>
                    <strong className="lms-cert-value">{course.instructor.name}</strong>
                  </div>
                  <div>
                    <span className="lms-cert-label">Issued By</span>
                    <strong className="lms-cert-value">PC Creations Agency Hub</strong>
                  </div>
                  <div>
                    <span className="lms-cert-label">Certificate ID</span>
                    <strong className="lms-cert-value">PC-LMS-{Date.now().toString().slice(-6)}</strong>
                  </div>
                </div>

                <div className="lms-cert-actions">
                  <button 
                    className="btn btn-primary"
                    onClick={() => {
                      alert('Generating PDF Certificate for ' + (user?.name || 'Student'));
                    }}
                  >
                    <Download size={18} />
                    <span>Download PDF Certificate</span>
                  </button>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => setShowCertificate(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
