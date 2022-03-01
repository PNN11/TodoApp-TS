export interface FilterValues {
  status: string;
  priority: string;
  title: string;
  dateStart: string;
}

export interface FilterProps {
  filterValues: FilterValues;
  onChangeFilterValues: (name: string, value: string) => void;
}
