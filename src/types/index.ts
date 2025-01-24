interface WorkOrderDetails {
  state: 'generated' | 'error';
  value: string | null;
  isStale: boolean;
  errorType?: string;
}

export interface WorkOrder {
  Country?: string;
  Address?: string;
  'Work Order Details': WorkOrderDetails;
  City?: string;
  'State/Province'?: string;
  'C-Wire Qty'?: number;
  'Thermostat Qty'?: number;
  'Client Site Name'?: string;
  'Postal Code'?: string;
  Coordinates?: string;
  'Site ID'?: string;
  Store: string;
  Installers?: string;
  Deployments?: string[];
}
