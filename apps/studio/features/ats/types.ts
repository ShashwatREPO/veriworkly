export type AtsRuleResult = {
  id: string;
  severity: "info" | "warning" | "error";
  passed: boolean;
  evidence: string;
  scoreImpact: number;
  fix: string;
};

export type AtsReport = {
  version: "ats-v1";
  readinessScore: number;
  jobMatchScore: number | null;
  parsingWarnings: string[];
  strengths: string[];
  failedChecks: AtsRuleResult[];
  prioritizedFixes: string[];
};

export type AtsResult = {
  report: AtsReport;
  ai: {
    explanation: string;
    missingEvidence: string[];
    keywordOpportunities: string[];
    recommendedImprovements: string[];
    priorityOrder: string[];
  } | null;
  creditsSpent: number;
  quota: {
    tier: "anonymous" | "free" | "subscriber";
    limit: number;
    used: number;
    remaining: number;
    resetsAt: string;
    canConvertResume: boolean;
    pricing: AtsPricing;
  };
};

export type AtsPricing = {
  analysisCredits: { min: number; max: number };
  jobUrlAnalysisCredits: { min: number; max: number };
  resumeConversionCredits: number;
};

export type AtsQuota = AtsResult["quota"];

export type ConvertedResume = {
  basics: {
    fullName: string;
    role: string;
    headline: string;
    email: string;
    phone: string;
    location: string;
  };
  links: Array<{ label: string; url: string }>;
  summary: string;
  experience: Array<{
    company: string;
    role: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    summary: string;
    highlights: string[];
  }>;
  education: Array<{
    school: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    current: boolean;
    summary: string;
  }>;
  projects: Array<{
    name: string;
    role: string;
    link: string;
    summary: string;
    highlights: string[];
    skills: string[];
  }>;
  skills: Array<{ name: string; keywords: string[] }>;
};
