# TASK 1

Write function `task1` which will find first match.
Use only stdlib.

Assumptions for `data`:
- has key `value` which should be returned at full match
- keys in `search` must be same as in header of data
  if not raise exception with message `Key mismatch`
- name (except for `value`) and order of columns are not fixed

If no match is found, return '-1'.
Please add some memory efficient caching if needed.

Example:
data = 'side,currency,value\nIN,PLN,1\nIN,EUR,2\nOUT,ANY,3'

task1({'side': 'IN', 'currency': 'PLN'}, data) == '1'
task1({'side': 'IN', 'currency': 'GBP'}, data) == '-1'

# TASK 2

Using data format from first task, write function `task2`,  
which will count weighted average (one number) for given key list  
rounded to one decimal place as string.

Assume that value column is integer.

Weight is:
- `10` if value is odd
- `20` if value is even

**Example call:**

task2(
    [
        {'side': 'IN', 'currency': 'PLN'},
        {'side': 'OUT', 'currency': 'EUR'},
    ], 
    'side,currency,value\nIN,PLN,1\nIN,EUR,2\nOUT,ANY,3'
)
