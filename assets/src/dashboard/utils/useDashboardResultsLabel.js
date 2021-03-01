/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * External dependencies
 */
import { sprintf, _n } from '@web-stories-wp/i18n';
import { useMemo } from 'react';

/**
 * Internal dependencies
 */
import { RESULT_LABELS } from '../constants';

export default function useDashboardResultsLabel({
  isActiveSearch,
  currentFilter,
  totalResults,
  view,
}) {
  const resultsLabel = useMemo(() => {
    const numResults = totalResults ?? 0;
    const defaultLabel = RESULT_LABELS[view]?.[currentFilter] || '';
    const interprettedDefaultLabel =
      typeof defaultLabel === 'function'
        ? defaultLabel(numResults)
        : defaultLabel;
    return isActiveSearch
      ? sprintf(
          /* translators: %s: number of results */
          _n(
            '<strong>%s</strong> result',
            '<strong>%s</strong> results',
            numResults,
            'web-stories'
          ),
          numResults
        )
      : interprettedDefaultLabel;
  }, [isActiveSearch, totalResults, view, currentFilter]);

  return resultsLabel;
}
