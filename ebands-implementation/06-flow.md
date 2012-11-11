!SLIDE center

# Elastic Band Update Loop

1. Convert each of the path points to a bubble (first time, and new frames)
2. Update bubble sizes to min obstacle distances
3. Check for gaps in bubble path, interpolate and try and complete it by inserting one bubble.
4. Remove redundant bubbles. (If two neighbors of a bubble overlap, then the bubble may be removed)
5. Apply artificial forces to bubbles and re-optimize(insert and remove bubbles)

.notes -Step 3 is applied recursively on first conversion.
-Step 5 iterated 3 times in implementation