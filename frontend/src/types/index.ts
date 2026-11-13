export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  coverImageUrl: string;
  productCount: number;
  displayOrder: number;
}

export interface ProductVariant {
  id: number;
  skuCode: string;
  wattage: string;
  lumenOutput: string;
  cct: string;
  beamAngle: string;
  bodyColor: string;
  controlType: string;
  dimensions: string;
  isDefault: boolean;
}

export interface ProductListItem {
  id: number;
  categoryId: number;
  categoryName: string;
  categorySlug: string;
  code: string;
  name: string;
  slug: string;
  shortDescription: string;
  mainImageUrl: string;
  ledChipBrand: string;
  driverBrand: string;
  ipRating: string;
  cri: string;
  macAdam: string;
  ugr: string;
  isFeatured: boolean;
  wattages: string[];
  ccts: string[];
  beamAngles: string[];
  bodyColors: string[];
  controlTypes: string[];
}

export interface ProductDetail {
  id: number;
  categoryId: number;
  categoryName: string;
  categorySlug: string;
  code: string;
  name: string;
  slug: string;
  shortDescription: string;
  technicalDescription: string;
  mainImageUrl: string;
  galleryImages: string[];
  polarDiagramUrl: string;
  dimensionDrawingUrl: string;
  datasheetPdfUrl: string;
  iesFileUrl: string;
  cadFileUrl: string;
  manualPdfUrl: string;
  ledChipBrand: string;
  driverBrand: string;
  material: string;
  ipRating: string;
  ikRating: string;
  cri: string;
  macAdam: string;
  lifetime: string;
  operatingVoltage: string;
  ugr: string;
  isFeatured: boolean;
  variants: ProductVariant[];
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  location: string;
  completionYear: number;
  architectName: string;
  lightingDesigner: string;
  applicationType: string;
  description: string;
  coverImageUrl: string;
  galleryImages: string[];
  isFeatured: boolean;
  luminaireCodes: string[];
}

export interface Catalogue {
  id: number;
  title: string;
  type: string;
  description: string;
  coverImageUrl: string;
  pdfUrl: string;
  fileSize: string;
  versionYear: number;
  pageCount: number;
}

export interface ApplicationArea {
  id: number;
  name: string;
  slug: string;
  description: string;
  heroImageUrl: string;
  productCount: number;
}

export interface QuoteItem {
  productId: number;
  productCode: string;
  productName: string;
  productImageUrl: string;
  productVariantId?: number;
  wattage: string;
  cct: string;
  beamAngle: string;
  bodyColor: string;
  controlType: string;
  quantity: number;
  itemNote?: string;
}

export interface QuoteDetail {
  id: number;
  referenceNumber: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  country: string;
  projectName: string;
  projectType: string;
  estimatedDeliveryDate?: string;
  attachmentFileName?: string;
  attachmentPath?: string;
  attachmentSizeBytes?: number;
  customerNotes?: string;
  internalAdminNotes?: string;
  status: 'New' | 'InReview' | 'Quoted' | 'Closed';
  createdAt: string;
  totalLuminaires: number;
  items: {
    id: number;
    productId: number;
    productCode: string;
    productName: string;
    productImageUrl: string;
    productVariantId?: number;
    selectedSpecsJson: string;
    quantity: number;
    itemNote?: string;
  }[];
}

export interface QuoteStats {
  totalQuotes: number;
  newQuotes: number;
  inReviewQuotes: number;
  quotedQuotes: number;
  closedQuotes: number;
  totalLuminairesRequested: number;
}

export interface DistributorApplication {
  id?: number;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  website?: string;
  annualTurnover?: string;
  currentBrands?: string;
  targetMarkets?: string;
  message: string;
  status?: string;
  createdAt?: string;
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  role: string;
}
