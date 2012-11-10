!SLIDE light-on-dark center bgfull
![background](rubberbands.jpg)

# Elastic Bands

!SLIDE incremental center small 

# __Objective__

* "To close the gap between _global_ path _planning_ and real-time sensor-based robot _control_"
  * i.e tighter coupling between global path and local path 
  
!SLIDE center
 
## Most local planning methods 
  - are more concerned with obstacle avoidance than following the global path.
  - Only look for a feasible path to the goal
  - provide no guarantee in regards to keeping a collision-free path to the goal.
  
.notes - Examples of how DWA and Potential Fields do not have a path. THey just simply try and find a path to the goal.
  
  
!SLIDE center transition=toss incremental

The **intention** of the _elastic bands_ method  
is to <u>__maintain__</u> a <b style="font-size: 35pt;">_deformable collision-free path_</b> to the goal at __all__ times. 
    
  - "We always know we have a valid path." This _knowledge_ sets elastic bands apart from other sensor-based methods

