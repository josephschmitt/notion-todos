import { Todo, StatusGroup, StatusOption, StatusSectionView, StatusCategoryView } from '../types/todo';

// Helper to get options for a group
export function getOptionsForGroup(
  group: StatusGroup,
  statusOptions: StatusOption[]
): StatusOption[] {
  return group.option_ids
    .map(id => statusOptions.find(opt => opt.id === id))
    .filter((opt): opt is StatusOption => opt !== undefined);
}

// Build status sections for a single group
export function buildStatusSections(
  group: StatusGroup,
  statusOptions: StatusOption[],
  todos: Todo[]
): { statusSections: StatusSectionView[]; totalCount: number } {
  const options = getOptionsForGroup(group, statusOptions);
  const statusSections: StatusSectionView[] = [];
  let totalCount = 0;

  options.forEach(option => {
    const optionTodos = todos.filter(todo => todo.status === option.id);

    if (optionTodos.length > 0) {
      statusSections.push({
        option,
        todos: optionTodos,
        count: optionTodos.length,
      });
      totalCount += optionTodos.length;
    }
  });

  return { statusSections, totalCount };
}

// Build all status category views (for main screen)
export function buildStatusCategoryViews(
  statusGroups: StatusGroup[],
  statusOptions: StatusOption[],
  todos: Todo[]
): StatusCategoryView[] {
  const categoryViews: StatusCategoryView[] = [];

  statusGroups.forEach(group => {
    const { statusSections, totalCount } = buildStatusSections(group, statusOptions, todos);

    if (totalCount > 0) {
      categoryViews.push({
        group,
        statusSections,
        totalCount,
      });
    }
  });

  return categoryViews;
}
