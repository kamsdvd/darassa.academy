import { useState } from 'react';
import { centerService } from '../services/center.service';
import {
  Center,
  CenterState,
  CenterStatus,
  Facility,
  FacilityStatus,
  Equipment,
  EquipmentStatus,
  StaffMember,
  StaffStatus,
  OpeningHours
} from '../types/center.types';

export const useCenter = () => {
  const [state, setState] = useState<CenterState>({
    centers: [],
    currentCenter: null,
    isLoading: true,
    error: null
  });

  // Charger les centres
  const loadCenters = async (params?: {
    status?: CenterStatus;
    city?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const { centers } = await centerService.getCenters(params);
      setState(prev => ({
        ...prev,
        centers,
        isLoading: false
      }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Une erreur est survenue'
      }));
    }
  };

  // Charger un centre spécifique
  const loadCenter = async (centerId: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const center = await centerService.getCenterById(centerId);
      setState(prev => ({
        ...prev,
        currentCenter: center,
        isLoading: false
      }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Une erreur est survenue'
      }));
    }
  };

  // Créer un nouveau centre
  const createCenter = async (center: Omit<Center, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const newCenter = await centerService.createCenter(center);
      setState(prev => ({
        ...prev,
        centers: [...prev.centers, newCenter],
        isLoading: false
      }));
      return newCenter;
    } catch (err) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Une erreur est survenue'
      }));
      throw err;
    }
  };

  // Mettre à jour un centre
  const updateCenter = async (centerId: string, center: Partial<Center>) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const updatedCenter = await centerService.updateCenter(centerId, center);
      setState(prev => ({
        ...prev,
        centers: prev.centers.map(c =>
          c.id === centerId ? updatedCenter : c
        ),
        currentCenter:
          prev.currentCenter?.id === centerId ? updatedCenter : prev.currentCenter,
        isLoading: false
      }));
      return updatedCenter;
    } catch (err) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Une erreur est survenue'
      }));
      throw err;
    }
  };

  // Mettre à jour le statut d'un centre
  const updateCenterStatus = async (centerId: string, status: CenterStatus) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const updatedCenter = await centerService.updateCenterStatus(centerId, status);
      setState(prev => ({
        ...prev,
        centers: prev.centers.map(c =>
          c.id === centerId ? updatedCenter : c
        ),
        currentCenter:
          prev.currentCenter?.id === centerId ? updatedCenter : prev.currentCenter,
        isLoading: false
      }));
      return updatedCenter;
    } catch (err) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Une erreur est survenue'
      }));
      throw err;
    }
  };

  // Mettre à jour les horaires d'ouverture
  const updateOpeningHours = async (centerId: string, openingHours: OpeningHours) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const updatedCenter = await centerService.updateOpeningHours(centerId, openingHours);
      setState(prev => ({
        ...prev,
        centers: prev.centers.map(c =>
          c.id === centerId ? updatedCenter : c
        ),
        currentCenter:
          prev.currentCenter?.id === centerId ? updatedCenter : prev.currentCenter,
        isLoading: false
      }));
      return updatedCenter;
    } catch (err) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Une erreur est survenue'
      }));
      throw err;
    }
  };

  // Installations
  const getFacilities = async (centerId: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const facilities = await centerService.getFacilities(centerId);
      setState(prev => ({
        ...prev,
        currentCenter: prev.currentCenter
          ? {
              ...prev.currentCenter,
              facilities
            }
          : null,
        isLoading: false
      }));
      return facilities;
    } catch (err) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Une erreur est survenue'
      }));
      throw err;
    }
  };

  const createFacility = async (centerId: string, facility: Omit<Facility, 'id'>) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const newFacility = await centerService.createFacility(centerId, facility);
      setState(prev => ({
        ...prev,
        currentCenter: prev.currentCenter
          ? {
              ...prev.currentCenter,
              facilities: [...prev.currentCenter.facilities, newFacility]
            }
          : null,
        isLoading: false
      }));
      return newFacility;
    } catch (err) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Une erreur est survenue'
      }));
      throw err;
    }
  };

  const updateFacilityStatus = async (
    centerId: string,
    facilityId: string,
    status: FacilityStatus
  ) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const updatedFacility = await centerService.updateFacilityStatus(
        centerId,
        facilityId,
        status
      );
      setState(prev => ({
        ...prev,
        currentCenter: prev.currentCenter
          ? {
              ...prev.currentCenter,
              facilities: prev.currentCenter.facilities.map(f =>
                f.id === facilityId ? updatedFacility : f
              )
            }
          : null,
        isLoading: false
      }));
      return updatedFacility;
    } catch (err) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Une erreur est survenue'
      }));
      throw err;
    }
  };

  // Équipements
  const getEquipment = async (centerId: string, facilityId: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const equipment = await centerService.getEquipment(centerId, facilityId);
      setState(prev => ({
        ...prev,
        currentCenter: prev.currentCenter
          ? {
              ...prev.currentCenter,
              facilities: prev.currentCenter.facilities.map(f =>
                f.id === facilityId ? { ...f, equipment } : f
              )
            }
          : null,
        isLoading: false
      }));
      return equipment;
    } catch (err) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Une erreur est survenue'
      }));
      throw err;
    }
  };

  const updateEquipmentStatus = async (
    centerId: string,
    facilityId: string,
    equipmentId: string,
    status: EquipmentStatus
  ) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const updatedEquipment = await centerService.updateEquipmentStatus(
        centerId,
        facilityId,
        equipmentId,
        status
      );
      setState(prev => ({
        ...prev,
        currentCenter: prev.currentCenter
          ? {
              ...prev.currentCenter,
              facilities: prev.currentCenter.facilities.map(f =>
                f.id === facilityId
                  ? {
                      ...f,
                      equipment: f.equipment.map(e =>
                        e.id === equipmentId ? updatedEquipment : e
                      )
                    }
                  : f
              )
            }
          : null,
        isLoading: false
      }));
      return updatedEquipment;
    } catch (err) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Une erreur est survenue'
      }));
      throw err;
    }
  };

  // Personnel
  const getStaff = async (centerId: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const staff = await centerService.getStaff(centerId);
      setState(prev => ({
        ...prev,
        currentCenter: prev.currentCenter
          ? {
              ...prev.currentCenter,
              staff
            }
          : null,
        isLoading: false
      }));
      return staff;
    } catch (err) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Une erreur est survenue'
      }));
      throw err;
    }
  };

  const addStaffMember = async (
    centerId: string,
    staffMember: Omit<StaffMember, 'id'>
  ) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const newStaffMember = await centerService.addStaffMember(centerId, staffMember);
      setState(prev => ({
        ...prev,
        currentCenter: prev.currentCenter
          ? {
              ...prev.currentCenter,
              staff: [...prev.currentCenter.staff, newStaffMember]
            }
          : null,
        isLoading: false
      }));
      return newStaffMember;
    } catch (err) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Une erreur est survenue'
      }));
      throw err;
    }
  };

  const updateStaffStatus = async (
    centerId: string,
    staffId: string,
    status: StaffStatus
  ) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const updatedStaffMember = await centerService.updateStaffStatus(
        centerId,
        staffId,
        status
      );
      setState(prev => ({
        ...prev,
        currentCenter: prev.currentCenter
          ? {
              ...prev.currentCenter,
              staff: prev.currentCenter.staff.map(s =>
                s.id === staffId ? updatedStaffMember : s
              )
            }
          : null,
        isLoading: false
      }));
      return updatedStaffMember;
    } catch (err) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Une erreur est survenue'
      }));
      throw err;
    }
  };

  return {
    ...state,
    loadCenters,
    loadCenter,
    createCenter,
    updateCenter,
    updateCenterStatus,
    updateOpeningHours,
    getFacilities,
    createFacility,
    updateFacilityStatus,
    getEquipment,
    updateEquipmentStatus,
    getStaff,
    addStaffMember,
    updateStaffStatus
  };
}; 