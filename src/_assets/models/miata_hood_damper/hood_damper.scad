include <BOSL2/std.scad>

thickness = 4.5;

parallelogram_base = 18.0;
parallelogram_height = 15.0;
parallelogram_outer_wall_length = 0.0;
parallelogram_inner_wall_length = 0.0;
parallelogram_outer_angle = 30.0;
parallelogram_inner_angle = 20.0;
// [base, height]
triangle_dimensions = [9.5, 12.0];
// Too lazy to do that math
triangle_height_fudge = 0.5;
triangle_right_fudge = 0.4;

depth = 25.50;

hole_d = 3.5;
// offset from big side
hole_offset = 9.0;

bracer_angle = 20;
// F math [x, y, length]
bracer_fudge = [2, 0, thickness/2];

fn = 32;

/* [Hidden] */

parellogram_right_shift = parallelogram_height / tan(90 - parallelogram_outer_angle);
b = parallelogram_base - parellogram_right_shift + parallelogram_height / tan(90 - parallelogram_inner_angle);

module chop(do_round = false) {
  back(parallelogram_height) trapezoid(
      h=b,
      w1=parallelogram_height - triangle_dimensions.y,
      w2=0,
      spin=90 - atan((parallelogram_height - triangle_dimensions.y) / b / 2),
      anchor=TOP,
      rounding=do_round ? [0, 0, -min(parallelogram_height, parallelogram_base) / 8, 0] : 0,
      $fn=fn
    );
}

module parallelogram(do_round = false, skip_chop = false) {
  difference() {
    left(parellogram_right_shift)
      #trapezoid(
        h=parallelogram_height, w1=parallelogram_base, ang=[90 - parallelogram_outer_angle, 90 + parallelogram_inner_angle], anchor=BOTTOM + LEFT,
        rounding=do_round ? min(parallelogram_height, parallelogram_base) / 8 : 0,
        $fn=fn
      );
    // Chop top off
    if (!skip_chop) {
      chop(do_round);
    }
  }
}

module tri(do_round = false) {
  right(parellogram_right_shift + triangle_right_fudge) {
    trapezoid(
      h=triangle_dimensions.y + triangle_height_fudge, w1=triangle_dimensions.x, w2=0.5, anchor=BOTTOM + LEFT, rounding=do_round ? [
          0.25,
          0.25,
          (triangle_dimensions.y + triangle_height_fudge) / 8,
          (triangle_dimensions.y + triangle_height_fudge) / 8,
        ]
      : 0, $fn=fn
    );
  }
}

module body() {
  scale_factor = 1 + (thickness * 2 / parallelogram_height);
  difference() {
    union() {
      linear_extrude(depth)
        difference() {
          fwd(thickness)
              scale(scale_factor)
                difference() {
                  union() {
                    parallelogram(do_round=true, skip_chop=true);
                    tri(do_round=true);
                  }
                  // Chop the top off
                  chop();
                }
          // Chop main holes
          right(thickness * 0.25) parallelogram(do_round=true);
          right(thickness) tri(do_round=true);
        }

      // Complete bottom
      left(parellogram_right_shift) cuboid([parallelogram_base + triangle_dimensions.x, thickness, depth], anchor=BOTTOM+LEFT+BACK);
      // Add tri-bracer
      move([tan(bracer_angle)*parallelogram_height + bracer_fudge.x, -thickness/2 + bracer_fudge.y, 0])
        zrot(bracer_angle) cuboid([thickness/2, parallelogram_height/cos(bracer_angle) + bracer_fudge.z, depth], anchor=BOTTOM+FWD);
    }
    // Chop feet
    for (i = [0:1]) {
      fwd(thickness) linear_extrude(depth) right(parellogram_right_shift * scale_factor + (6.75 * i))
        #rect(2.25, rounding=[2.25 / 2, 2.25 / 2, 0, 0], anchor=BOTTOM, $fn=fn);
    }
  }
}

// Final body with screw hole
module final() {
  difference() {
    // adjust position to make top flat
    zrot(
      90 - atan(
        (parallelogram_base - parellogram_right_shift + triangle_dimensions.x / 2) / (parallelogram_height - triangle_dimensions.y)
      )
    ) move([0, -parallelogram_height, -depth / 2]) body();
    // chop push-pin hole
    right(hole_offset) teardrop(l=thickness * 2, d=hole_d, anchor=FWD, $fn=fn);
  }
}

final();