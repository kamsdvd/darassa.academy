import axios from 'axios';
import {
  Center,
  CenterStatus,
  Facility,
  FacilityStatus,
  Equipment,
  EquipmentStatus,
  StaffMember,
  StaffStatus,
  OpeningHours
} from '../types/center.types';
import { authService } from '../../auth/services/auth.service';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

class CenterService {
  private getAuthHeader() {
    const token = authService.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  // Centres
  async getCenters(params?: {
    status?: CenterStatus;
    city?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const response = await axios.get(`${API_URL}/centers`, {
      params,
      headers: this.getAuthHeader()
    });
    return response.data;
  }

  async getCenterById(centerId: string): Promise<Center> {
    const response = await axios.get(`${API_URL}/centers/${centerId}`, {
      headers: this.getAuthHeader()
    });
    return response.data;
  }

  async createCenter(center: Omit<Center, 'id' | 'createdAt' | 'updatedAt'>): Promise<Center> {
    const response = await axios.post(`${API_URL}/centers`, center, {
      headers: this.getAuthHeader()
    });
    return response.data;
  }

  async updateCenter(
    centerId: string,
    center: Partial<Center>
  ): Promise<Center> {
    const response = await axios.patch(`${API_URL}/centers/${centerId}`, center, {
      headers: this.getAuthHeader()
    });
    return response.data;
  }

  async updateCenterStatus(
    centerId: string,
    status: CenterStatus
  ): Promise<Center> {
    const response = await axios.patch(
      `${API_URL}/centers/${centerId}/status`,
      { status },
      {
        headers: this.getAuthHeader()
      }
    );
    return response.data;
  }

  async updateOpeningHours(
    centerId: string,
    openingHours: OpeningHours
  ): Promise<Center> {
    const response = await axios.patch(
      `${API_URL}/centers/${centerId}/opening-hours`,
      { openingHours },
      {
        headers: this.getAuthHeader()
      }
    );
    return response.data;
  }

  // Installations
  async getFacilities(centerId: string): Promise<Facility[]> {
    const response = await axios.get(`${API_URL}/centers/${centerId}/facilities`, {
      headers: this.getAuthHeader()
    });
    return response.data;
  }

  async createFacility(
    centerId: string,
    facility: Omit<Facility, 'id'>
  ): Promise<Facility> {
    const response = await axios.post(
      `${API_URL}/centers/${centerId}/facilities`,
      facility,
      {
        headers: this.getAuthHeader()
      }
    );
    return response.data;
  }

  async updateFacility(
    centerId: string,
    facilityId: string,
    facility: Partial<Facility>
  ): Promise<Facility> {
    const response = await axios.patch(
      `${API_URL}/centers/${centerId}/facilities/${facilityId}`,
      facility,
      {
        headers: this.getAuthHeader()
      }
    );
    return response.data;
  }

  async updateFacilityStatus(
    centerId: string,
    facilityId: string,
    status: FacilityStatus
  ): Promise<Facility> {
    const response = await axios.patch(
      `${API_URL}/centers/${centerId}/facilities/${facilityId}/status`,
      { status },
      {
        headers: this.getAuthHeader()
      }
    );
    return response.data;
  }

  // Équipements
  async getEquipment(centerId: string, facilityId: string): Promise<Equipment[]> {
    const response = await axios.get(
      `${API_URL}/centers/${centerId}/facilities/${facilityId}/equipment`,
      {
        headers: this.getAuthHeader()
      }
    );
    return response.data;
  }

  async updateEquipmentStatus(
    centerId: string,
    facilityId: string,
    equipmentId: string,
    status: EquipmentStatus
  ): Promise<Equipment> {
    const response = await axios.patch(
      `${API_URL}/centers/${centerId}/facilities/${facilityId}/equipment/${equipmentId}/status`,
      { status },
      {
        headers: this.getAuthHeader()
      }
    );
    return response.data;
  }

  async scheduleMaintenance(
    centerId: string,
    facilityId: string,
    equipmentId: string,
    maintenanceDate: string
  ): Promise<Equipment> {
    const response = await axios.post(
      `${API_URL}/centers/${centerId}/facilities/${facilityId}/equipment/${equipmentId}/maintenance`,
      { maintenanceDate },
      {
        headers: this.getAuthHeader()
      }
    );
    return response.data;
  }

  // Personnel
  async getStaff(centerId: string): Promise<StaffMember[]> {
    const response = await axios.get(`${API_URL}/centers/${centerId}/staff`, {
      headers: this.getAuthHeader()
    });
    return response.data;
  }

  async addStaffMember(
    centerId: string,
    staffMember: Omit<StaffMember, 'id'>
  ): Promise<StaffMember> {
    const response = await axios.post(
      `${API_URL}/centers/${centerId}/staff`,
      staffMember,
      {
        headers: this.getAuthHeader()
      }
    );
    return response.data;
  }

  async updateStaffMember(
    centerId: string,
    staffId: string,
    staffMember: Partial<StaffMember>
  ): Promise<StaffMember> {
    const response = await axios.patch(
      `${API_URL}/centers/${centerId}/staff/${staffId}`,
      staffMember,
      {
        headers: this.getAuthHeader()
      }
    );
    return response.data;
  }

  async updateStaffStatus(
    centerId: string,
    staffId: string,
    status: StaffStatus
  ): Promise<StaffMember> {
    const response = await axios.patch(
      `${API_URL}/centers/${centerId}/staff/${staffId}/status`,
      { status },
      {
        headers: this.getAuthHeader()
      }
    );
    return response.data;
  }
}

export const centerService = new CenterService(); 