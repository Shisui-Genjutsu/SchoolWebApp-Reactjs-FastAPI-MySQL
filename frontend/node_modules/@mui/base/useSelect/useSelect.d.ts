import { UseSelectParameters, UseSelectResult } from './useSelect.types';
/**
 *
 * Demos:
 *
 * - [Unstyled Select](https://mui.com/base/react-select/#hook)
 *
 * API:
 *
 * - [useSelect API](https://mui.com/base/api/use-select/)
 */
declare function useSelect<TValue, Multiple extends boolean = false>(props: UseSelectParameters<TValue, Multiple>): UseSelectResult<TValue, Multiple>;
export default useSelect;
