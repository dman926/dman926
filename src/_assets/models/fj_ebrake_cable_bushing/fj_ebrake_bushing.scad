include <BOSL2/std.scad>

/* [Sizing] */
od = 21.6;
flare_od = 26;
id = 14;
// Length from flare edge to flare edge
total_length = 30;
// Extra bushing added to each end (sticks out of the bushing area, and houses the tie down)
extra_buffer = 8;
// [length, depth]
tie_down_slot_area = [3, 4];

/* [Misc] */

// Rounding factor
fn = 128;

/* [Hidden] */

l = total_length / 2;

// Part

up(l+extra_buffer) xrot(180) #difference() {
  union() {
    tube(l=l, od=od, id=id, orounding2=-(flare_od - od) / 2, anchor=BOTTOM, ochamfer=0.5, $fn=fn);
    up(l) #tube(l=extra_buffer, od=flare_od, id=id, anchor=BOTTOM, $fn=fn);
  }
  // Cut a down down point for a zip tie
  up(l + extra_buffer * 2 / 3) {
    fwd(flare_od / 2 - 1) {
      cuboid([flare_od, tie_down_slot_area.y, tie_down_slot_area.x / 2], anchor=FWD);
      translate([-flare_od / 2, tie_down_slot_area.y / 2, -tie_down_slot_area.x / 4]) #difference() {
        teardrop(h=flare_od, d=tie_down_slot_area.y, anchor=FWD, spin=90, orient=DOWN, $fn=fn);
        cuboid([flare_od, tie_down_slot_area.y, tie_down_slot_area.x], anchor=LEFT+BOTTOM);
      }
    }
    back(flare_od / 2 - 1) {
      cuboid([flare_od, tie_down_slot_area.y, tie_down_slot_area.x / 2], anchor=BACK);
      translate([-flare_od / 2, -tie_down_slot_area.y / 2, -tie_down_slot_area.x / 4]) #difference() {
        teardrop(h=flare_od, d=tie_down_slot_area.y, anchor=FWD, spin=90, orient=DOWN, $fn=fn);
        cuboid([flare_od, tie_down_slot_area.y, tie_down_slot_area.x], anchor=LEFT+BOTTOM);
      }
    }
  }

  // Cut a slit in the wall to allow the bushing to slip around the ebrake line
  cuboid([flare_od/2, 1, l+extra_buffer], anchor=BOTTOM+RIGHT);
}

// cuboid([flare_od, tie_down_slot_area.y, tie_down_slot_area.x / 2], anchor=FWD);
// difference() {
//   teardrop(h=flare_od, d=tie_down_slot_area.y, anchor=FWD, spin=90, orient=DOWN, $fn=fn);
//   cuboid([flare_od, tie_down_slot_area.y, tie_down_slot_area.x], anchor=LEFT+BOTTOM);
// }