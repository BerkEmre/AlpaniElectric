import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../services/api';
import { Project } from '../types';
import { MapPin, ArrowRight, ArrowLeft, Download, FileText, Grid, List, Sparkles } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTypology, setSelectedTypology] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    api.getProjects()
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const typologies = ['All', 'Museum & Cultural', 'Corporate HQ', 'Hospitality', 'Residential'];

  const filteredProjects = selectedTypology === 'All'
    ? projects
    : projects.filter(p => p.applicationType?.toLowerCase().includes(selectedTypology.toLowerCase()));

  return (
    <div className="min-h-screen bg-obsidian-base text-on-surface">
      {/* CANONICAL PAGE HEADER / HERO */}
      <section className="border-b border-border-hairline px-6 lg:px-16 pt-10 pb-12 bg-surface-container-lowest relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        
        <div className="max-w-[1720px] mx-auto relative z-10">
          {/* Minimalist Breadcrumbs */}
          <div className="flex items-center gap-2 text-text-muted font-mono text-[11px] uppercase tracking-wider mb-6">
            <Link to="/" className="hover:text-text-alabaster transition-colors">Home</Link>
            <span className="text-border-hairline">/</span>
            <span className="text-text-muted">Architectural References</span>
            <span className="text-border-hairline">/</span>
            <span className="text-primary font-medium">Built Works Index</span>
          </div>

          {/* Title Block */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-border-hairline/60">
            <div className="max-w-4xl">
              <h1 className="text-3xl sm:text-5xl font-light text-text-alabaster tracking-tight mb-3 uppercase font-sans">
                Architectural References &amp; Built Works
              </h1>
              <p className="font-mono text-xs text-text-muted tracking-wider leading-relaxed">
                ILLUMINATING NATIONAL MUSEUMS, FINANCIAL TOWERS &amp; BESPOKE RESIDENCES ACROSS EUROPE, ASIA &amp; MIDDLE EAST // DIN EN 60598 / CIE 115 / IES LM-79
              </p>
            </div>

            {/* Document Spec Quick Link */}
            <div className="flex items-center gap-3 shrink-0">
              <a
                href="#boq-inquiry"
                className="border border-border-hairline bg-surface-raised px-4 py-2.5 font-mono text-xs text-text-alabaster hover:border-text-muted transition-colors flex items-center gap-3 group"
              >
                <FileText className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                <span>2026 MONOGRAPH INDEX (PDF)</span>
                <span className="text-text-muted">140MB</span>
              </a>
            </div>
          </div>

          {/* Precision Key Stats Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
            <div className="border-l border-border-hairline pl-4">
              <div className="text-3xl font-light text-text-alabaster tracking-tight">64</div>
              <div className="font-mono text-[10px] text-text-muted uppercase tracking-wider mt-1">Global Built Works</div>
            </div>
            <div className="border-l border-border-hairline pl-4">
              <div className="text-3xl font-light text-primary tracking-tight">48+</div>
              <div className="font-mono text-[10px] text-text-muted uppercase tracking-wider mt-1">Award Recognitions</div>
            </div>
            <div className="border-l border-border-hairline pl-4">
              <div className="text-3xl font-light text-text-alabaster tracking-tight">35</div>
              <div className="font-mono text-[10px] text-text-muted uppercase tracking-wider mt-1">Countries Specified</div>
            </div>
            <div className="border-l border-border-hairline pl-4">
              <div className="text-3xl font-light text-kelvin-amber tracking-tight">0.0%</div>
              <div className="font-mono text-[10px] text-text-muted uppercase tracking-wider mt-1">Glare Target Compliance (UGR&lt;10)</div>
            </div>
          </div>
        </div>
      </section>

      {/* TYPOLOGY FILTER & VIEWPORT CONTROLS BAR */}
      <section className="border-b border-border-hairline bg-surface-raised sticky top-16 z-40 px-6 lg:px-16 py-3">
        <div className="max-w-[1720px] mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Architectural Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 no-scrollbar">
            {typologies.map((t) => {
              const active = selectedTypology === t;
              return (
                <button
                  key={t}
                  onClick={() => setSelectedTypology(t)}
                  className={`px-3.5 py-1.5 font-mono text-xs flex items-center gap-2 shrink-0 transition-colors ${
                    active
                      ? 'bg-surface-raised border border-primary text-text-alabaster'
                      : 'bg-surface-raised border border-border-hairline hover:border-text-muted text-text-muted hover:text-text-alabaster'
                  }`}
                >
                  {active && <span className="w-1.5 h-1.5 bg-primary"></span>}
                  <span>{t === 'All' ? 'All Typologies' : t}</span>
                </button>
              );
            })}
          </div>

          {/* Controls: Sort & Grid/List Switcher */}
          <div className="flex items-center gap-4 shrink-0 border-t lg:border-t-0 border-border-hairline pt-2 lg:pt-0">
            <div className="flex items-center border border-border-hairline bg-obsidian-base">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 transition-colors ${viewMode === 'grid' ? 'text-primary bg-surface-container-low' : 'text-text-muted hover:text-text-alabaster'}`}
                title="Bento Gallery View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 transition-colors ${viewMode === 'list' ? 'text-primary bg-surface-container-low' : 'text-text-muted hover:text-text-alabaster'}`}
                title="Tabular Spec Index"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECT PORTFOLIO GRID */}
      <section className="px-6 lg:px-16 py-12">
        <div className="max-w-[1720px] mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-96 bg-surface-raised border border-border-hairline animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}>
              {filteredProjects.map((p) => (
                <article
                  key={p.id}
                  className="bg-surface-raised border border-border-hairline flex flex-col group hover:border-primary/60 transition-all duration-300"
                >
                  {/* Luminaire Imagery / Architectural Void Viewport */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-obsidian-base border-b border-border-hairline">
                    <img
                      src={p.coverImageUrl}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale-[20%] contrast-110"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-obsidian-base/90 backdrop-blur-sm border border-border-hairline px-2.5 py-1 font-mono text-[10px] text-primary uppercase tracking-wider">
                        {p.applicationType}
                      </span>
                      <span className="bg-obsidian-base/90 backdrop-blur-sm border border-border-hairline px-2.5 py-1 font-mono text-[10px] text-text-alabaster uppercase tracking-wider">
                        {p.location}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-obsidian-base/90 border border-primary/40 px-2 py-0.5 font-mono text-[10px] text-primary">
                      CRI Ra &gt;95 // MacAdam &le;2
                    </div>
                  </div>

                  {/* Content & Spec Matrix */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono text-text-muted mb-2">
                        <span>COMPLETION: {p.completionYear}</span>
                        <span>ARCH: {p.architectName}</span>
                      </div>
                      <h3 className="text-xl font-medium text-text-alabaster uppercase group-hover:text-primary transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-xs text-text-muted mt-3 line-clamp-3 leading-relaxed font-light">
                        {p.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-border-hairline flex items-center justify-between font-mono text-xs">
                      <span className="text-text-muted">SYSTEM: 48V MAGNATRACK</span>
                      <Link
                        to={`/projects/${p.slug}`}
                        className="text-text-alabaster group-hover:text-primary transition-colors flex items-center gap-1.5 uppercase font-medium"
                      >
                        <span>Examine Specs</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    api.getProjectBySlug(slug)
      .then(setProject)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading || !project) {
    return (
      <div className="min-h-screen bg-obsidian-base text-on-surface flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian-base text-on-surface py-12 px-6 lg:px-16">
      <div className="max-w-[1400px] mx-auto space-y-10">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 font-mono text-xs text-text-muted hover:text-text-alabaster transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Built Works Index</span>
        </Link>

        <div>
          <div className="flex items-center gap-3 font-mono text-xs text-primary uppercase tracking-wider mb-2">
            <span>{project.applicationType}</span>
            <span>//</span>
            <span>{project.completionYear}</span>
            <span>//</span>
            <span>{project.location}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-light text-text-alabaster tracking-tight uppercase font-sans">
            {project.title}
          </h1>
        </div>

        {/* Hero image */}
        <div className="relative aspect-[21/9] overflow-hidden border border-border-hairline bg-surface-raised">
          <img
            src={project.coverImageUrl}
            alt={project.title}
            className="w-full h-full object-cover filter contrast-110"
          />
        </div>

        {/* Project Facts Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-surface-raised border border-border-hairline font-mono text-xs">
          <div>
            <span className="text-text-muted block text-[10px] uppercase">Architect:</span>
            <strong className="text-text-alabaster font-normal">{project.architectName}</strong>
          </div>
          <div>
            <span className="text-text-muted block text-[10px] uppercase">Lighting Designer:</span>
            <strong className="text-text-alabaster font-normal">{project.lightingDesigner || 'Alpani Studio Zurich'}</strong>
          </div>
          <div>
            <span className="text-text-muted block text-[10px] uppercase">Location:</span>
            <strong className="text-text-alabaster font-normal">{project.location}</strong>
          </div>
          <div>
            <span className="text-text-muted block text-[10px] uppercase">Completion:</span>
            <strong className="text-primary font-normal">{project.completionYear}</strong>
          </div>
        </div>

        {/* Story */}
        <div className="space-y-4 max-w-4xl">
          <h3 className="text-sm font-mono text-primary uppercase tracking-widest">
            Architectural Lighting Strategy
          </h3>
          <p className="text-sm sm:text-base text-text-muted leading-relaxed font-light">
            {project.description}
          </p>
        </div>

        {/* Gallery */}
        {project.galleryImages && project.galleryImages.length > 0 && (
          <div className="space-y-4 pt-6 border-t border-border-hairline">
            <h3 className="font-mono text-xs uppercase tracking-widest text-text-muted">
              Visual Documentation
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.galleryImages.map((img, idx) => (
                <div key={idx} className="aspect-[16/10] overflow-hidden border border-border-hairline bg-surface-raised">
                  <img
                    src={img}
                    alt={`${project.title} detail ${idx}`}
                    className="w-full h-full object-cover filter contrast-105"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Luminaire Schedule CTA */}
        <div className="p-8 bg-surface-raised border border-primary/40 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-base font-medium text-text-alabaster uppercase">Specify for your architectural tender</h3>
            <p className="font-mono text-xs text-text-muted mt-1">
              Submit plans for certified DIALux calculations and guaranteed 24h technical quotation.
            </p>
          </div>
          <Link
            to="/quote-request"
            className="px-6 py-3 bg-primary text-obsidian-base hover:bg-white font-mono font-medium text-xs uppercase tracking-wider transition-colors shrink-0"
          >
            Submit Project Tender
          </Link>
        </div>
      </div>
    </div>
  );
};
