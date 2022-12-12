/* 

Policy Interpretations begin by identfying how many statements there, how they overlap permissions, and whether the conditions apply.

deny allow deny...
if there is no explicit allow, you start denied. 

to interpret policy docs, start with zero permissions stance. 

explicity denies always win.  Even if your policy allows something, then denies, it results in deny. 

with a conditions block, the effect action and resource statements only apply if the conditions are met. 
*/