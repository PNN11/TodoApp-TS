export interface TodoHeaderProps {
  open: () => void;
  count: number;
  onDeleteCompleted: () => void;
  onDeleteAll: () => void;
}
