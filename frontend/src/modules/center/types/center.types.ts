export interface Center {
  id: string;
  name: string;
  description: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  contact: {
    email: string;
    phone: string;
    website?: string;
  };
  facilities: Facility[];
  staff: StaffMember[];
  courses: string[]; // IDs des cours disponibles dans ce centre
  capacity: number;
  status: CenterStatus;
  openingHours: OpeningHours;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export enum CenterStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  MAINTENANCE = 'MAINTENANCE',
  CLOSED = 'CLOSED'
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  type: FacilityType;
  capacity: number;
  equipment: Equipment[];
  status: FacilityStatus;
}

export enum FacilityType {
  CLASSROOM = 'CLASSROOM',
  LABORATORY = 'LABORATORY',
  CONFERENCE_ROOM = 'CONFERENCE_ROOM',
  WORKSHOP = 'WORKSHOP',
  LIBRARY = 'LIBRARY',
  CAFETERIA = 'CAFETERIA',
  OTHER = 'OTHER'
}

export enum FacilityStatus {
  AVAILABLE = 'AVAILABLE',
  OCCUPIED = 'OCCUPIED',
  MAINTENANCE = 'MAINTENANCE',
  RESERVED = 'RESERVED'
}

export interface Equipment {
  id: string;
  name: string;
  type: EquipmentType;
  quantity: number;
  status: EquipmentStatus;
  lastMaintenance?: string;
  nextMaintenance?: string;
}

export enum EquipmentType {
  COMPUTER = 'COMPUTER',
  PROJECTOR = 'PROJECTOR',
  WHITEBOARD = 'WHITEBOARD',
  AUDIO_VISUAL = 'AUDIO_VISUAL',
  FURNITURE = 'FURNITURE',
  OTHER = 'OTHER'
}

export enum EquipmentStatus {
  OPERATIONAL = 'OPERATIONAL',
  MAINTENANCE = 'MAINTENANCE',
  OUT_OF_ORDER = 'OUT_OF_ORDER'
}

export interface StaffMember {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: StaffRole;
  department: string;
  startDate: string;
  endDate?: string;
  status: StaffStatus;
}

export enum StaffRole {
  ADMINISTRATOR = 'ADMINISTRATOR',
  MANAGER = 'MANAGER',
  INSTRUCTOR = 'INSTRUCTOR',
  SUPPORT = 'SUPPORT',
  MAINTENANCE = 'MAINTENANCE'
}

export enum StaffStatus {
  ACTIVE = 'ACTIVE',
  ON_LEAVE = 'ON_LEAVE',
  INACTIVE = 'INACTIVE'
}

export interface OpeningHours {
  monday: TimeSlot;
  tuesday: TimeSlot;
  wednesday: TimeSlot;
  thursday: TimeSlot;
  friday: TimeSlot;
  saturday: TimeSlot;
  sunday: TimeSlot;
}

export interface TimeSlot {
  isOpen: boolean;
  openTime?: string;
  closeTime?: string;
}

export interface CenterState {
  centers: Center[];
  currentCenter: Center | null;
  isLoading: boolean;
  error: string | null;
} 