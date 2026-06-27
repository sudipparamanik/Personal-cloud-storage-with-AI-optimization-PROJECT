export const recentFiles = [
  { id: 1, name: 'Project Proposal.pdf', type: 'PDF', size: '2.4 MB', uploadedOn: 'May 20, 2024' },
  { id: 2, name: 'Meeting Notes.docx', type: 'DOCX', size: '1.1 MB', uploadedOn: 'May 19, 2024' },
  { id: 3, name: 'Design System.fig', type: 'FIG', size: '5.6 MB', uploadedOn: 'May 18, 2024' },
  { id: 4, name: 'Budget.xlsx', type: 'XLSX', size: '820 KB', uploadedOn: 'May 17, 2024' },
  { id: 5, name: 'Presentation.pptx', type: 'PPTX', size: '3.2 MB', uploadedOn: 'May 16, 2024' },
  { id: 6, name: 'Q1 Report.pdf', type: 'PDF', size: '4.1 MB', uploadedOn: 'May 15, 2024' },
  { id: 7, name: 'Client Brief.docx', type: 'DOCX', size: '890 KB', uploadedOn: 'May 14, 2024' },
  { id: 8, name: 'Assets.zip', type: 'ZIP', size: '12.3 MB', uploadedOn: 'May 13, 2024' },
];

export const searchResults = [
  { id: 1, name: 'Project Proposal.pdf', type: 'PDF', size: '2.4 MB', uploadedOn: 'May 20, 2024', relevance: 5 },
  { id: 2, name: 'Project Proposal - Final.docx', type: 'DOCX', size: '1.8 MB', uploadedOn: 'May 18, 2024', relevance: 4 },
  { id: 3, name: 'Proposal Overview.pptx', type: 'PPTX', size: '3.1 MB', uploadedOn: 'May 15, 2024', relevance: 3 },
  { id: 4, name: 'Project Proposal 2024.pdf', type: 'PDF', size: '2.7 MB', uploadedOn: 'May 10, 2024', relevance: 2 },
  { id: 5, name: 'Client Proposal.docx', type: 'DOCX', size: '1.2 MB', uploadedOn: 'May 08, 2024', relevance: 2 },
];

export const duplicateFiles = [
  { id: 1, name: 'Project Proposal.pdf', copies: 3, size: '7.2 MB', wasted: '4.8 MB' },
  { id: 2, name: 'Meeting Notes.docx', copies: 2, size: '2.2 MB', wasted: '1.1 MB' },
  { id: 3, name: 'Budget_Final.xlsx', copies: 4, size: '3.3 MB', wasted: '2.5 MB' },
  { id: 4, name: 'Company Logo.png', copies: 5, size: '1.5 MB', wasted: '1.2 MB' },
];

export const typeColors = {
  PDF: 'text-red-400 bg-red-400/10 border-red-400/20',
  DOCX: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  FIG: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
  XLSX: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  PPTX: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
  ZIP: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  PNG: 'text-pink-400 bg-pink-400/10 border-pink-400/20',
};
