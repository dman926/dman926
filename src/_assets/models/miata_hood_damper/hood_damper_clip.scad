include <BOSL2/std.scad>

fn = 64;

head_d = 10.0;
head_thickness = 2.0;
stem_d = 5.25;
stem_length = 13.25;


module capsule(l, d, cutoff = 0.0, side_round=0.025) {
  up(l / 2) rotate_extrude(angle=360, convexity=10, $fn=fn)
      intersection() {
        ellipse([d * (0.5 + side_round), l * (0.5 + cutoff)], $fn=fn);
        square([d / 2, l], anchor=LEFT);
      }
}

module part() {
  union() {
    // head
    cyl(h=head_thickness, d=head_d, anchor=BOTTOM, rounding1=head_thickness / 4, $fn=fn);

    // stem
    up(head_thickness * 0.75) difference() {
      union() {
        capsule(stem_length, stem_d, 0.05);
      }

      // Carve out interior and one side
      scalar = 0.825;
      d = stem_d * (scalar - (1-scalar));
      l = stem_length * scalar;
      up(stem_length * (1-scalar) / 4) union() {
            capsule(l, d);
            up(l / 2) xrot(90) linear_extrude(stem_d / 2)
                  ellipse([d / 2, l * (0.5)], $fn=fn);
          }
    }
  }
}

part();