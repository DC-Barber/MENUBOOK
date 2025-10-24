// hairstylesDetails.js - Professional Hairstyle Details Database
const hairstylesDetails = {
    // Fade Hairstyles (7) - Updated with precise technical details (Height, Length, Contour)
    1: {
        name: "Low Fade",
        details: `**Fade Height:** Starts low, just above the ear and along the clean, natural hairline. **Fade Length:** Blends cleanly from the top down to a #1 guard (1/8") or a clean taper finish at the bottom. **Top Hair:** 3 inches long, styled for a clean, professional look. **Contrast:** Subtle and gradual blend.`
    },
    2: {
        name: "Mid Fade",
        details: `**Fade Height:** Starts at the mid-point (between the temple and the ear). **Fade Length:** Fades aggressively down to skin level (zero length/bald fade) at the bottom. **Top Hair:** 4-5 inches, heavily textured for a modern, dry finish. **Contrast:** Excellent, balanced contrast for wearability.`
    },
    3: {
        name: "High Fade",
        details: `**Fade Height:** Starts high, near the parietal ridge/temple area. **Fade Length:** Fades aggressively down to skin level (zero length/bald fade) at the bottom. **Top Hair:** 2 inches long, often styled with a side part or significant height. **Contrast:** Maximum contrast, creating a bold, dramatic look.`
    },
    4: {
        name: "Skin Fade (Bald Fade)",
        details: `**Fade Length:** The sides and back are completely shaved down to zero length (skin level) using clippers, trimmers, and/or a foil shaver. **Fade Height:** Can be combined with Low, Mid, or High fade heights. **Top Hair:** 3 inches long, textured for a messy, controlled style. **Contrast:** Defined by the zero-level finish.`
    },
    5: {
        name: "Drop Fade",
        details: `**Fade Contour:** The fade line starts high or mid-level and curves distinctly down (drops) behind the ear toward the nape. **Fade Length:** Fades down to a skin-level finish at the bottom. **Top Hair:** 3-4 inches long, heavily textured, styled forward into a messy fringe. **Contrast:** More dramatic than a standard Low Fade due to the curved contour.`
    },
    6: {
        name: "Curly Mid Skin Fade",
        details: `**Top Hair:** 4-5 inches of natural, tight, defined curls, styled with volume. **Sides:** A crisp **Mid Skin Fade** (Mid-level to zero-level/skin finish) to contain the volume. **Contrast:** Extremely high contrast between the dense curls and the clean, bald fade.`
    },
    7: {
        name: "Taper Fade",
        details: `**Fade Area:** A Taper focuses only on the hairline, sideburns, and nape, gradually shortening the hair in these areas. **Fade Length:** Blends from the top down to a short length (e.g., #1 or #2 guard) but does **not** go down to skin level. **Top Hair:** 4 inches long, neatly combed with a soft side part. **Contrast:** Minimal to Subtle Contrast, offering a neater look without the sharpness of a full fade.`
    },

    // Buzz Cut Styles (6)
    8: {
        name: "Induction Cut",
        details: `The shortest military-style haircut, uniformly cut with a #0 or #1 guard (1/16th inch) all over the entire head. Crisp, clean hairline.`
    },
    9: {
        name: "Buzz Cut",
        details: `A uniform Buzz Cut cut with a #2 guard (1/4 inch) all over the head. Very short, slight texture visible. Crisp lines on the edges.`
    },
    10: {
        name: "Butch Cut",
        details: `A uniform Buzz Cut cut with a #3 guard (3/8 inch) all over the head. Maintains a rounded shape and soft, short texture.`
    },
    11: {
        name: "Crew Cut",
        details: `Hair is short on the sides (tapered or #2 guard) and gradually longer on top (up to 1.5 inches), styled slightly up and forward at the forehead. Very neat and masculine.`
    },
    12: {
        name: "Ivy League Cut",
        details: `A professional cut, short on the sides (tapered) and long enough on top (2 inches) to be cleanly parted and swept to the side. Smooth, glossy finish.`
    },
    13: {
        name: "Fade Buzz Cut",
        details: `A Butch Cut (e.g., #3 guard) on top, perfectly blended with a High Skin Fade on the sides. High-contrast and modern.`
    },

    // Undercut Styles (5)
    14: {
        name: "Classic Undercut",
        details: `Sides and back are cut to a uniform #2 guard, completely disconnected from the 4-inch top hair, which is styled with a slight side sweep and medium shine.`
    },
    15: {
        name: "Disconnected Skin Undercut",
        details: `Sides are shaved to #0 (skin) with a distinct, razor-sharp line where it meets the 5-inch long hair on top. Top hair is voluminous and pushed back.`
    },
    16: {
        name: "Textured Undercut",
        details: `Sides are a #1 guard. The 3-inch top hair is layered and styled with messy, piecey texture for volume and a dry finish.`
    },
    17: {
        name: "Slick Back Undercut",
        details: `Sides are a tight #1 guard. The long top hair (6 inches) is aggressively combed straight back using a high-shine pomade for a glossy, wet-look finish. Sharp disconnection.`
    },
    18: {
        name: "Side Part Undercut",
        details: `**Sides:** Cut to a uniform #1 guard, completely disconnected from the top. **Top Hair:** 4 inches long, parted cleanly to one side. **Part:** A precisely defined parting line (can be a Hard Part - razor line). Styled with medium-shine pomade for a sleek, classic look.`
    },

    // Pompadour Styles (5)
    19: {
        name: "Classic Pompadour",
        details: `High volume roll created by sweeping the 6-inch front hair up and smoothly back over the crown. Sides are neatly tapered (not faded) and slicked back. High shine.`
    },
    20: {
        name: "Modern Pompadour",
        details: `A textured Pompadour with slightly less shine and more separation in the 5-inch hair at the front. Sides are a clean taper or low fade.`
    },
    21: {
        name: "Fade Pompadour",
        details: `A dramatic Pompadour with 5 inches of height, paired with a sharp Mid Skin Fade on the sides and back for extreme contrast and clean lines.`
    },
    22: {
        name: "Textured Pompadour",
        details: `The 5-inch top is styled high, but the texture and layers are visible. Styled with a matte clay for a dry, natural, voluminous finish. Sides are a #2 guard.`
    },
    23: {
        name: "Short Pompadour",
        details: `A low-maintenance Pompadour with only 3 inches of modest lift at the front. Sides are a neat taper, giving a subtle professional lift.`
    },

    // Quiff Styles (5)
    24: {
        name: "Classic Quiff",
        details: `The 5-inch top hair is swept up and slightly forward, then smoothed back to create a full, rounded lift at the forehead. Sides are neatly scissored. Medium shine.`
    },
    25: {
        name: "Modern Quiff",
        details: `The 4-inch top hair has visible texture and is styled upwards and slightly back for a casual, rugged look. Sides are a tight taper.`
    },
    26: {
        name: "Fade Quiff",
        details: `A voluminous Quiff (4-5 inches) on top, paired with a High Fade on the sides and back. The hair is lifted for maximum height.`
    },
    27: {
        name: "Short Quiff",
        details: `A conservative Quiff with only 3 inches of hair on top, offering subtle lift and easy management. Sides are a neat #2 guard.`
    },
    28: {
        name: "Side Quiff",
        details: `The 5-inch top hair is styled up and also strongly directed toward one side, creating a dynamic, sweeping, angled volume. Sides are tapered.`
    },

    // Side Part Styles (5)
    29: {
        name: "Classic Side Part w/ Mid Skin Fade",
        details: `**Top Hair:** 2-2.5 inches, styled flat and neatly combed to one side. **Parting:** Perfectly straight, thin **Hard Part** (razor line). **Sides:** High-contrast **Mid Skin Fade** (Mid-level to zero-level/skin finish). **Finish:** High-shine pomade for a sleek, glossy look.`
    },
    30: {
        name: "Hard Part w/ High Skin Fade",
        details: `**Top Hair:** 3.5-4 inches, combed flat and to the side, styled with high-shine pomade. **Parting:** Razor-shaved **Hard Part**. **Sides:** High-contrast **Mid-High Skin Fade** (starting near the parietal ridge, blending to zero-level/razor-shaved finish). **Contrast:** Maximum contrast.`
    },
    31: {
        name: "Textured Side Part w/ Low Taper Fade",
        details: `**Top Hair:** 3.5-4.5 inches, heavily layered and textured. **Parting:** Natural, soft parting line. **Sides:** **Low Taper Fade** (blending from #3 down to #1) for minimal contrast. **Styling:** Matte clay/paste for a dry, natural finish. **Volume:** Medium volume, not slicked flat.`
    },
    32: {
        name: "Fade Side Part",
        details: `3-inch top hair with a clean side part, paired with a Mid Fade on the sides. The contrast is sharp and clean.`
    },
    33: {
        name: "Curtain Part",
        details: `4-inch wavy hair, parted directly down the center, falling symmetrically to frame the face on both sides. Natural movement.`
    },

    // Slick Back Styles (5)
    34: {
        name: "Classic Slick Back",
        details: `6-inch top hair, combed aggressively straight back, flat against the head. Styled with heavy, oil-based pomade for intense, rigid shine. Sides are short tightly tapered.`
    },
    35: {
        name: "Textured Slick Back",
        details: `5-inch top hair, combed back but with layers and texture visible for movement. Styled with a dry clay for volume and zero shine.`
    },
    36: {
        name: "Wet Look Slick Back",
        details: `5-inch top hair, combed back using high-shine gel to create an intentional, dripping-wet appearance. Sides are cut with a high taper.`
    },
    37: {
        name: "Dry Slick Back",
        details: `4-inch top hair, combed back and set with a matte paste for a natural, voluminous, and non-glossy finish. Subtle side blending.`
    },
    38: {
        name: "Slick Back Undercut",
        details: `6-inch top hair is slicked back with high shine. Sides are completely **disconnected**, shaved to a #0 guard for maximum visual break.`
    },

    // Curly Hair Styles (5)
    39: {
        name: "Curly Fade",
        details: `Natural, medium-length (3-4 inch) defined curls on top, contrasted sharply with a High Skin Fade on the sides and back.`
    },
    40: {
        name: "Curly Top w/ High Volume Fade",
        details: `Natural curly hair (3-4 inches) from crown to forehead, styled with maximum volume. Back and Sides have a High Fade.`
    },
    41: {
        name: "Textured Curls",
        details: `Defined, ringlet-style curls (4 inches long) that are layered to enhance their natural coil. Used curl-defining product for minimal frizz. Sides are a #2 guard.`
    },
    42: {
        name: "Short Curls",
        details: `Uniformly short, tight curls (2 inches) all over the head. Very low maintenance and neat, emphasizing the natural texture.`
    },
    43: {
        name: "Afro Style",
        details: `A full, perfectly rounded, dense Afro shape (6+ inches) with highly defined natural texture. Clean, sharp, natural hairline around the ears and neck.`
    },

    // Long Hair Styles (5)
    44: {
        name: "Man Bun",
        details: `All long hair (8+ inches) is pulled back tightly and secured into a neat, high bun (top knot) on the crown of the head. Sides are natural length.`
    },
    45: {
        name: "Long Layers",
        details: `Chest-length hair (10+ inches) with long layers cut in for shape and natural movement. Styled naturally with a clean side part and soft flow.`
    },
    46: {
        name: "Half Bun",
        details: `Only the top portion of the long hair (from the temples to the crown) is tied back into a small, tight bun, leaving the rest of the hair hanging loose.`
    },
    47: {
        name: "Pony Tail",
        details: `All long hair is gathered and secured cleanly at the nape of the neck into a low, neat ponytail.`
    },
    48: {
        name: "Natural Long",
        details: `Very long, free-flowing, straight hair (12+ inches) styled with natural texture and minimal product or cutting. Natural center part.`
    },

    // French Crop Styles (5)
    49: {
        name: "Classic French Crop",
        details: `Short hair on top (2-3 inches), brushed forward with a blunt, straight fringe that covers part of the forehead. Sides are cut with a clean #2 guard.`
    },
    50: {
        name: "Textured French Crop",
        details: `The 3-inch hair on top is heavily layered and styled forward, creating a messy, piecey, high-texture fringe. Sides are a #1 guard.`
    },
    51: {
        name: "Fade French Crop",
        details: `A classic French Crop fringe paired with a sharp Mid Skin Fade on the sides and back. High contrast and modern definition.`
    },
    52: {
        name: "Long French Crop",
        details: `The top hair is left longer (4 inches), allowing the fringe to be heavier and styled with more volume and lift forward. Sides are a #3 guard.`
    },
    53: {
        name: "Short French Crop",
        details: `A very tight French Crop. Top hair is 1 inch long and brushed forward into a tiny, neat fringe. Sides are a tight #0.5 guard.`
    },

    // Comb Over Styles (5)
    54: {
        name: "Classic Comb Over",
        details: `4-inch top hair is parted and smoothly combed flat and over to the side. Styled with medium shine pomade. Sides are neatly tapered with scissors.`
    },
    55: {
        name: "Modern Comb Over",
        details: `The 4-inch top hair is combed over, but with visible texture and volume, not slicked flat. Styled with matte clay. Sides are a clean taper.`
    },
    56: {
        name: "Volume Comb Over",
        details: `The 5-inch top hair is blow-dried high before being combed over, creating significant lift and height in the swept section. Sides are a #2 guard.`
    },
    57: {
        name: "Fade Comb Over w/ Hard Part",
        details: `The 4-inch top hair is combed over with a clean hard part. Sides are cut with a sharp Low Fade for a modern contrast.`
    },
    58: {
        name: "Short Comb Over",
        details: `A subtle comb over with only 2-3 inches of hair on top, making it neat, conservative, and easy to manage. Sides are a #1 guard.`
    },

    // Spiky Styles (5)
    59: {
        name: "Textured Spikes",
        details: `3-4 inch top hair is styled upward into soft, irregular, and piecey spikes using a matte clay for a natural, rugged look. Sides are a #2 guard.`
    },
    60: {
        name: "Sharp Spikes",
        details: `4-5 inch top hair is styled aggressively upward into defined, rigid, needle-like spikes using a strong-hold gel for maximum definition. Sides are a #3 guard.`
    },
    61: {
        name: "Fade Spikes",
        details: `3-inch textured spikes on top, paired with a clean Mid Fade on the sides and back. High contrast with a sharp, youthful look.`
    },
    62: {
        name: "Short Spikes",
        details: `A low-maintenance style with 2 inches of hair on top, spiked straight up for a tight, controlled, and neat finish. Sides are a #1 guard.`
    },
    63: {
        name: "Long Spikes",
        details: `5-6 inch top hair is spiked up into dramatic, separated, long spikes. Requires strong product and significant height. Sides are cut with scissors.`
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = hairstylesDetails;
} else {
    window.hairstylesDetails = hairstylesDetails;
}
