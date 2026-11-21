include <BOSL2/std.scad>

// [length, diameter]
standoff_shank_size = [4, 2];
// [length, diameter]
m3_screw_shank_size = [4, 2.8];

faceplate_hole_size = [33, 5.5, 66.5];
outlet_full_size = [faceplate_hole_size.x, faceplate_hole_size.y + 15, 70 + (13 + 5.5) * 2];
wall_thickness = faceplate_hole_size.y / 2;

pcb_main_size = [31, 84, 
// MCU to bottom of board
14.5 +
// bottom of board to top of ammeter headers
8];
pcb_thickness = 1.66;
pcb_standoff_size_and_edge_spacing = [30.15, 70.12, 1.25];

relay_size = [38.5, 23, 18.25];
relay_feet_corner_distance_and_height = [3.6, 23 - relay_size.z];

module controller() {
  if ($preview) {
    cuboid([pcb_standoff_size_and_edge_spacing.x, pcb_standoff_size_and_edge_spacing.y, pcb_thickness], anchor=BOTTOM);
    up(pcb_thickness) {
      // MCU
      cuboid([21.1, 18, 14.5], anchor=BOTTOM);
      // Plug
      cuboid([5.8, 7.5, 11], anchor=BOTTOM);
    }
    // Ammeters
    move ([0, pcb_standoff_size_and_edge_spacing.y / 2 + 9.3, -8]) {
      cuboid([pcb_standoff_size_and_edge_spacing.x - 0.5, 7.85, 11.85], anchor=BOTTOM);
      move([0, 7.85 / 2, 11.85])
        #cuboid([pcb_standoff_size_and_edge_spacing.x - 0.5, 7.85 + 15, pcb_thickness], anchor=BOTTOM+BACK);
    }
  }
}

module relay() {
  if ($preview) {
    cuboid(relay_size, anchor=BOTTOM);
    for(i = [0:3]) {
      move([
        (relay_size.x / 2 - relay_feet_corner_distance_and_height.x) * (i % 2 == 0 ? 1 : -1),
        (relay_size.y / 2 - relay_feet_corner_distance_and_height.x) * (i == 3 || i % 2 == 0 && i != 2 ? 1 : -1),
        0
      ]) {
        cyl(h=relay_feet_corner_distance_and_height.y, d=1, anchor=TOP);
      }
    }
  }
}

module outlet() {
  if (true || $preview) {
    // main plate
    cuboid(faceplate_hole_size, anchor=BOTTOM+FWD);

    back(faceplate_hole_size.y) {
      // rest of body
      cuboid([faceplate_hole_size.x, 15, 70], anchor=BOTTOM+FWD);
      // screw wings
      wing_thickness = 1.25;
      up (70 / 2) {
        for (i = [0, 1]) {
          yrot(180 * i) {
            up(70 / 2) {
              difference() {
                cuboid([19, wing_thickness, 13], anchor=BOTTOM+FWD);
                up(13 - 2.5) {
                  cuboid([7.1, wing_thickness, 4.65], anchor=TOP+FWD);
                }
              }
              up(13) {
                // little nub
                difference() {
                  cuboid([6.25, wing_thickness, 5.5], anchor=BOTTOM+FWD, edges="Y", except=BOTTOM, rounding=6.25 / 2);
                  up(5.5 - 1.82) {
                    ycyl(h=wing_thickness, d=2.75, anchor=TOP+FWD, $fn=32);
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

main_enclosure_size = [outlet_full_size.x + wall_thickness * 2 + 10, outlet_full_size.y + 85 + wall_thickness, outlet_full_size.z + wall_thickness * 2 + 4];
controller_box_size = [relay_size.z + relay_feet_corner_distance_and_height.y + wall_thickness * 2, pcb_main_size.x + relay_size.x + wall_thickness * 2, pcb_main_size.y + relay_size.y + wall_thickness * 2];
final_controller_box_size = [controller_box_size.x, controller_box_size.y, controller_box_size.z + controller_box_size.x];

module main_chamber_cover() {
  difference() {
    cuboid([wall_thickness, main_enclosure_size.y, main_enclosure_size.z], anchor=BOTTOM);

    up((main_enclosure_size.z - wall_thickness * 2) / 2) #for(i = [1:4]) {
      move([
        0,
        (main_enclosure_size.y / 2 - wall_thickness * 1.5) * (i % 2 == 0 ? 1 : -1),
        (main_enclosure_size.z / 2 - wall_thickness * 1.5) * (i == 3 || (i != 2 && i % 2 == 0) ? 1 : -1)
      ]) {
        up(1.5) #xcyl(h=wall_thickness, d=m3_screw_shank_size.y, anchor=BOTTOM, $fn=32);
      }
    }
  }
}

screw_hole_size = [7.1, 4.65];
module outlet_screw_hole(thickness = wall_thickness, anchor=BACK) {
  cuboid([screw_hole_size.x - screw_hole_size.y, thickness, screw_hole_size.y], anchor=anchor);
  for (j = [-1,1]) {
    left((screw_hole_size.x - screw_hole_size.y) / 2 * j) #ycyl(l=thickness, d=screw_hole_size.y, anchor=anchor, $fn=32);
  }
}

module outlet_geometry() {
  cuboid(faceplate_hole_size, anchor=BACK);
  // screw holes
  for (i = [-1,1]) {
    up((faceplate_hole_size.z / 2 + 8.5) * i) {
      outlet_screw_hole();
    }
  }
}


module main_chamber() {
  union() {
    difference() {
      cuboid([main_enclosure_size.x, main_enclosure_size.y, main_enclosure_size.z], anchor=BOTTOM);
      
      // Hull
      move([main_enclosure_size.x / 2 - wall_thickness, 0, wall_thickness])
        #cuboid([main_enclosure_size.x - wall_thickness, main_enclosure_size.y - wall_thickness * 2, main_enclosure_size.z - wall_thickness * 2], anchor=BOTTOM+RIGHT);

      // Male outlet
      move([0, main_enclosure_size.y / 2, main_enclosure_size.z / 2]) #outlet_geometry();

      // Female outlet and backing
      move([0, -main_enclosure_size.y / 2, main_enclosure_size.z / 2]) zrot(180) #outlet_geometry();
    }
    move([0, -main_enclosure_size.y / 2 + wall_thickness + faceplate_hole_size.y, main_enclosure_size.z / 2]) #for(i = [-1,1]) {
      block_height = (main_enclosure_size.y - wall_thickness * 2) / 2 - ((faceplate_hole_size.z) / 2);
      for (i = [-1,1]) {
        up((-block_height / 2 + (main_enclosure_size.z - wall_thickness * 2) / 2) * i) {
          difference() {
            cuboid([main_enclosure_size.x, 10, block_height], anchor=FWD);
            // I'm not bothering with math here
            up(4.5) #outlet_screw_hole(thickness=10, anchor=FWD);
          }
        }
      }
    }
  }
  
  // Add screw holes for cover
  move([-(main_enclosure_size.x) / 2, 0, (main_enclosure_size.z - wall_thickness * 2) / 2]) #for(i = [1:4]) {
    move([
      0,
      (main_enclosure_size.y / 2 - wall_thickness * 1.5) * (i % 2 == 0 ? 1 : -1),
      (main_enclosure_size.z / 2 - wall_thickness * 1.5) * (i == 3 || (i != 2 && i % 2 == 0) ? 1 : -1)
    ]) #difference() {
      xcyl(h=m3_screw_shank_size.x, d=m3_screw_shank_size.y + 3, anchor=BOTTOM+LEFT, $fn=32);
      up(1.5) #xcyl(h=m3_screw_shank_size.x, d=m3_screw_shank_size.y, anchor=BOTTOM+LEFT, $fn=32);
    }
  }
}

module controller_chamber() {
  standoff_offset = [
    final_controller_box_size.x - wall_thickness,
    (pcb_standoff_size_and_edge_spacing.x + 4) / 2 - final_controller_box_size.y + wall_thickness + pcb_standoff_size_and_edge_spacing.z,
    -final_controller_box_size.z + wall_thickness + pcb_standoff_size_and_edge_spacing.z];

  difference() {
    union() {
      difference() {
        cuboid(final_controller_box_size, anchor=TOP+LEFT+BACK, rounding = controller_box_size.x / 2, edges=TOP+RIGHT);

        // Hull
        move([wall_thickness, -wall_thickness, -wall_thickness])
          #cuboid(final_controller_box_size - [wall_thickness * 2, wall_thickness * 2, wall_thickness * 2], anchor=TOP+LEFT+BACK, rounding = controller_box_size.x / 2, edges=TOP+RIGHT);

        // Cut a window for accessing MCU and passing antenna through
        move([0, -final_controller_box_size.y + wall_thickness, -final_controller_box_size.z + wall_thickness]) {
          window_size = pcb_standoff_size_and_edge_spacing.x + 4 + pcb_standoff_size_and_edge_spacing.z * 2;
          
          cuboid([wall_thickness, window_size, 25], anchor=BOTTOM+LEFT+FWD);
          back(window_size) #cuboid([wall_thickness, final_controller_box_size.y - wall_thickness * 2 - window_size, 1.5], anchor=BOTTOM+LEFT+FWD);
        }
      }

      // Add stand-off holes
      move(standoff_offset) {
        for (i = [-1,1]) {
          fwd(pcb_standoff_size_and_edge_spacing.x / 2 * i)
            #xcyl(h=standoff_shank_size.x - wall_thickness / 2, d=standoff_shank_size.y + 2, anchor=BOTTOM+RIGHT, $fn=32);
        }
      }
    }
    // Cut stand-off holes
    move(standoff_offset) {
      up (1) #for (i = [-1,1]) {
        move([-standoff_shank_size.x + wall_thickness / 2, pcb_standoff_size_and_edge_spacing.x / 2 * i, 0])
          #xcyl(h=standoff_shank_size.x, d=standoff_shank_size.y, anchor=BOTTOM+LEFT, $fn=32);
      }
    }
  }
}

module enclosure() {

  difference() {
    union() {
      main_chamber();
      // Controller Chamber
      move([main_enclosure_size.x / 2, main_enclosure_size.y / 2, main_enclosure_size.z / 2 + controller_box_size.x])
        #controller_chamber();
    }

    // Punch out walls between chambers
    move([main_enclosure_size.x / 2 + wall_thickness, main_enclosure_size.y / 2 - wall_thickness, wall_thickness])
      #cuboid([wall_thickness * 2, final_controller_box_size.y - wall_thickness * 2, main_enclosure_size.z / 2 + controller_box_size.x - wall_thickness * 2], anchor=BOTTOM+RIGHT+BACK);
  }
}

// outlet();
// relay();
// controller();

// TODO: -y side
// Add holes for male plugs plus hole(s) for securing to the outlet
// TODO: +y side
// Open the outlet hole
// Add backing tabs to screw into
// TODO: Misc
// Add a panel to close it up
// Add standoffs for the PCB
// No good mounting options for transformer. Likely just glue it in place

enclosure();

// move([0, -main_enclosure_size.y / 2, -33.25 + main_enclosure_size.z / 2]) {
//   outlet();
// }

// left(wall_thickness / 2 + main_enclosure_size.x / 2) {
//   main_chamber_cover();
// }
