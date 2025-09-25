/*
  - In Questions 12 :- 
    - function trapRainWater(height) - what wrong in my approach :- 
      - Worst case O(n^2) time complexity
      - Math.min(leftMax, rightMax) - heightArr[i] for every i without clamping to >= 0. If Math.min(leftMax, rightMax) produces value lower than heightArr[i] then negative value can be added which in turn decrease the water value
    - function trapRainWaterClassic(height) - leftMax & rightMax arrays :- 
      - It calculates max for left array and right array. Left Array is like (0 to n) where 'mx' is calculated for each 'i', Math.max(mx, height[i]) -> leftMax[i] = mx and right array is similar. The only difference is that in the left array the 'for' loop is starting from '0' and goes to 'n-1' where as in right array the 'for' loop is starting from 'n-1' and goes to '0'.
      - Time Complexity is O(n) and space complexity is also O(n).
    - function trapRainWaterTwoPointer(height) - Two-pointer solution (recommended) :- 
      - This is the standard O(n) / O(1) solution: maintain left and right pointers and leftMax / rightMax. Move the side with the smaller max inward and accumulate trapped water safely.

      TODO :- More to add later after understanding the code for two pointer approach
*/
