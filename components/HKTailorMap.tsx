/*
 * HKTailorMap — Urban core view (real GeoJSON paths, zoomed into TST + HK Island)
 * Design: light bg, circular dots, grey for ~335 tailoring houses, gold for 3 Atelier Direct markers.
 * Paths derived from Natural Earth GeoJSON via geopandas, projected to 900x555 SVG space.
 * ViewBox zoomed to "350 320 250 190" to focus on urban core.
 */
import { useEffect, useRef, useState } from "react";

const F = {
  mono: "'JetBrains Mono', 'Courier New', monospace",
  display: "'Playfair Display', Georgia, serif",
  body: "'Inter', system-ui, sans-serif",
};

// Real GeoJSON-derived paths (Natural Earth, projected 900x555)
const HK_PATHS = [
  { d: `M 532.2 40.4 L 538.4 39.9 L 528.9 51.6 L 522.4 58.8 L 513.0 67.7 L 506.8 67.7 L 506.0 81.5 L 517.0 78.5 L 517.9 73.6 L 532.9 69.7 L 537.9 64.6 L 547.8 47.6 L 552.8 46.6 L 556.8 50.6 L 563.8 46.6 L 567.8 50.6 L 562.2 61.3 L 569.8 59.6 L 578.0 66.7 L 577.4 75.4 L 583.6 79.1 L 593.8 73.6 L 596.1 78.5 L 596.1 86.6 L 593.4 96.9 L 603.0 97.5 L 608.2 105.2 L 620.1 110.5 L 656.0 100.6 L 663.9 96.5 L 666.9 103.6 L 642.9 121.6 L 628.9 133.5 L 613.8 139.6 L 597.0 146.5 L 582.0 156.6 L 576.0 165.5 L 562.8 173.5 L 552.8 173.5 L 534.0 150.5 L 515.9 153.6 L 509.1 149.5 L 506.0 155.6 L 508.0 166.4 L 514.0 169.4 L 515.9 178.4 L 506.8 176.4 L 506.0 170.6 L 496.9 165.5 L 482.0 167.4 L 477.0 173.5 L 452.4 178.3 L 464.0 184.5 L 478.0 193.5 L 494.3 203.7 L 509.1 213.4 L 506.8 223.5 L 513.0 228.4 L 506.0 241.5 L 514.0 239.3 L 524.0 220.5 L 537.8 208.1 L 542.9 194.5 L 550.1 194.3 L 559.9 200.4 L 580.0 200.4 L 582.8 207.1 L 580.0 219.3 L 586.9 227.4 L 591.9 214.4 L 607.9 206.5 L 591.9 183.5 L 607.9 171.5 L 624.0 167.4 L 623.0 156.6 L 652.3 137.3 L 654.0 143.5 L 661.3 144.9 L 654.0 157.5 L 667.7 160.8 L 670.7 180.5 L 663.9 188.6 L 669.8 199.4 L 676.7 191.5 L 682.9 210.4 L 688.9 209.5 L 688.0 187.3 L 698.6 161.5 L 708.8 169.4 L 708.2 180.6 L 711.8 188.6 L 731.7 189.6 L 749.6 193.5 L 746.6 203.4 L 751.6 223.5 L 736.3 216.8 L 726.6 215.4 L 711.8 242.4 L 717.9 239.1 L 730.7 255.9 L 736.8 283.3 L 732.7 284.3 L 731.7 277.9 L 719.7 277.3 L 723.7 288.3 L 718.7 299.3 L 711.8 305.2 L 699.8 309.1 L 695.7 326.2 L 688.9 317.2 L 688.9 301.3 L 675.7 309.1 L 671.9 300.3 L 663.9 291.2 L 665.9 271.4 L 648.1 264.4 L 645.8 253.3 L 634.9 260.5 L 622.0 263.3 L 604.0 251.3 L 593.8 251.3 L 582.0 267.3 L 587.9 286.3 L 596.1 297.3 L 591.9 306.2 L 580.0 296.3 L 578.9 283.3 L 568.7 288.3 L 565.1 296.2 L 578.2 308.4 L 586.9 341.2 L 592.8 343.1 L 610.8 346.5 L 611.8 361.1 L 616.8 361.1 L 626.9 359.1 L 636.8 371.2 L 629.2 379.5 L 619.0 386.1 L 609.9 383.1 L 607.9 384.1 L 608.8 391.1 L 608.6 401.1 L 622.0 397.1 L 626.0 407.1 L 626.0 416.1 L 617.8 421.1 L 607.9 413.0 L 594.2 405.5 L 596.1 394.1 L 587.9 373.1 L 577.0 365.2 L 578.0 355.2 L 578.9 347.3 L 565.1 339.1 L 559.9 361.1 L 561.9 373.1 L 543.9 391.1 L 530.0 378.1 L 509.1 354.2 L 513.0 366.2 L 510.0 366.2 L 488.2 344.3 L 476.8 356.5 L 483.0 365.2 L 483.0 369.1 L 473.2 365.2 L 470.5 374.9 L 464.0 379.1 L 458.1 382.1 L 452.1 375.2 L 453.4 360.7 L 450.1 354.2 L 449.1 348.2 L 442.2 348.2 L 442.2 339.2 L 432.9 331.2 L 414.9 321.6 L 397.2 313.7 L 396.2 320.2 L 383.2 300.3 L 380.2 283.3 L 372.3 278.3 L 362.9 287.1 L 339.4 283.3 L 338.3 287.3 L 328.2 287.3 L 324.2 292.2 L 312.3 289.3 L 302.4 292.2 L 289.2 297.3 L 264.4 303.3 L 257.3 299.3 L 257.3 292.2 L 236.4 292.2 L 227.7 285.7 L 216.0 282.3 L 208.4 266.4 L 203.5 265.4 L 200.6 256.3 L 192.5 264.5 L 205.7 275.5 L 180.5 278.3 L 167.5 288.3 L 149.4 279.3 L 143.4 279.3 L 128.6 270.3 L 133.6 255.3 L 123.7 241.5 L 106.3 228.6 L 122.3 216.0 L 149.4 214.4 L 162.7 205.5 L 179.4 176.4 L 209.4 164.5 L 236.4 126.5 L 244.4 126.5 L 254.4 129.6 L 253.1 137.3 L 252.4 146.5 L 257.3 143.5 L 272.4 139.6 L 276.4 139.6 L 278.3 134.5 L 277.3 127.6 L 277.3 117.6 L 292.2 110.5 L 312.3 105.6 L 317.2 100.6 L 322.3 91.5 L 332.2 88.6 L 338.3 86.6 L 347.3 82.5 L 343.5 74.2 L 355.2 67.8 L 376.8 67.8 L 384.0 75.0 L 388.0 76.5 L 403.0 63.1 L 414.9 61.5 L 428.4 63.1 L 435.0 45.5 L 445.3 34.4 L 459.8 30.0 L 472.3 39.9 L 493.9 39.9 L 520.5 41.3 L 532.2 40.4 Z`, fill: "#ede9e3", stroke: "#ccc9c0", strokeWidth: 1 },
  { d: `M 413.9 522.8 L 380.0 525.0 L 384.1 513.9 L 384.1 475.0 L 371.5 475.2 L 374.2 467.0 L 374.7 449.9 L 383.1 453.0 L 388.4 467.7 L 399.0 478.5 L 408.1 475.0 L 408.1 482.9 L 399.0 489.0 L 414.9 487.9 L 429.6 487.9 L 436.0 491.1 L 421.2 500.6 L 416.1 507.0 L 424.1 522.9 L 413.9 522.8 Z`, fill: "#e8e4dc", stroke: "#ccc9c0", strokeWidth: 1 },
  { d: `M 514.0 386.1 L 521.9 394.1 L 530.0 392.1 L 539.9 396.1 L 549.9 413.0 L 559.9 420.1 L 559.9 433.1 L 552.0 442.1 L 556.8 454.0 L 562.8 465.0 L 556.8 467.0 L 565.8 491.1 L 549.9 494.0 L 545.8 489.0 L 535.9 481.0 L 535.8 467.5 L 531.8 452.7 L 523.0 446.0 L 515.5 451.7 L 523.0 454.0 L 523.0 464.0 L 517.9 465.0 L 509.1 475.0 L 517.9 488.0 L 514.0 497.0 L 519.0 506.0 L 503.9 509.0 L 501.8 489.0 L 506.0 486.0 L 502.4 479.8 L 489.0 486.0 L 483.0 482.9 L 489.0 476.1 L 480.0 471.1 L 486.0 463.0 L 483.0 456.0 L 471.9 454.0 L 473.4 443.2 L 457.1 453.0 L 452.1 460.0 L 449.1 460.0 L 446.2 453.0 L 444.1 444.0 L 432.9 438.1 L 412.1 437.1 L 403.3 433.1 L 398.1 423.1 L 396.2 417.1 L 390.2 407.1 L 382.1 404.2 L 383.2 396.1 L 386.1 394.1 L 392.2 391.1 L 403.3 386.1 L 416.1 382.1 L 429.9 386.1 L 439.1 391.1 L 450.1 394.1 L 467.0 394.1 L 478.9 384.1 L 489.9 378.1 L 502.2 382.8 L 514.0 386.1 Z`, fill: "#e4e0d8", stroke: "#c8c4bc", strokeWidth: 1 },
  { d: `M 41.7 499.4 L 32.4 489.4 L 30.7 472.7 L 30.0 459.0 L 32.4 451.9 L 45.2 451.9 L 45.2 439.2 L 54.9 436.8 L 54.9 428.8 L 47.0 423.1 L 47.6 422.6 L 58.8 414.5 L 67.9 407.4 L 68.7 405.2 L 80.5 403.2 L 89.7 394.1 L 100.6 377.0 L 124.6 377.0 L 137.7 378.1 L 146.5 387.1 L 159.6 382.1 L 189.4 366.2 L 208.4 370.2 L 217.3 356.2 L 228.5 354.2 L 237.5 339.2 L 260.3 322.3 L 264.4 331.2 L 294.2 309.1 L 301.2 313.7 L 308.3 321.2 L 304.4 331.2 L 302.4 342.2 L 297.2 338.1 L 287.2 336.3 L 278.3 336.3 L 276.0 356.2 L 254.4 353.2 L 254.4 370.2 L 266.5 365.3 L 260.6 381.7 L 262.3 413.0 L 243.5 413.0 L 232.2 409.0 L 247.4 429.0 L 228.5 442.9 L 257.3 461.0 L 238.4 475.0 L 215.0 485.1 L 213.4 476.1 L 213.4 448.0 L 198.6 448.0 L 186.4 448.0 L 168.6 448.0 L 146.5 465.0 L 137.7 465.0 L 133.6 471.1 L 146.5 474.0 L 146.5 481.9 L 134.6 489.2 L 118.2 490.5 L 102.6 476.1 L 100.6 467.0 L 89.7 470.1 L 76.5 478.9 L 57.9 493.9 L 41.7 499.4 Z`, fill: "#ede9e3", stroke: "#ccc9c0", strokeWidth: 1 },
];

// Zoomed into urban core: TST + HK Island north shore
const VIEW_BOX = "350 320 250 190";


const GREY_DOTS: {x:number;y:number}[] = [
  {x:506.4,y:327.4},
  {x:507.2,y:340.5},
  {x:506.8,y:307.5},
  {x:518.3,y:326.0},
  {x:504.6,y:331.7},
  {x:515.8,y:347.5},
  {x:526.4,y:331.7},
  {x:491.5,y:314.8},
  {x:516.2,y:349.7},
  {x:511.0,y:328.4},
  {x:523.3,y:308.2},
  {x:502.2,y:337.4},
  {x:531.8,y:326.4},
  {x:519.4,y:333.7},
  {x:529.6,y:313.3},
  {x:524.2,y:307.3},
  {x:460,y:320.9},
  {x:487.1,y:343.1},
  {x:526.6,y:311.7},
  {x:531.2,y:315.0},
  {x:507.8,y:325.6},
  {x:512.9,y:342.3},
  {x:526.0,y:335.2},
  {x:526.2,y:337.2},
  {x:494.3,y:319.2},
  {x:498.3,y:337.5},
  {x:503.7,y:360},
  {x:489.5,y:313.5},
  {x:529.2,y:351.3},
  {x:522.6,y:342.5},
  {x:545.7,y:328.6},
  {x:474.4,y:322.0},
  {x:533.8,y:308.3},
  {x:510.8,y:333.8},
  {x:502.1,y:340.9},
  {x:524.5,y:360},
  {x:525.5,y:320.9},
  {x:496.0,y:317.5},
  {x:533.8,y:321.5},
  {x:508.2,y:341.2},
  {x:491.9,y:325.6},
  {x:464.0,y:313.8},
  {x:495.8,y:336.2},
  {x:539.8,y:329.7},
  {x:516.5,y:332.5},
  {x:537.1,y:343.4},
  {x:516.8,y:314.8},
  {x:532.6,y:335.7},
  {x:540.7,y:329.6},
  {x:558.8,y:324.6},
  {x:549.8,y:331.7},
  {x:497.1,y:313.1},
  {x:506.2,y:351.3},
  {x:530.4,y:340.3},
  {x:460,y:340.7},
  {x:523.9,y:321.8},
  {x:494.3,y:330.0},
  {x:553.1,y:314.2},
  {x:499.3,y:350.4},
  {x:498.8,y:324.5},
  {x:512.4,y:311.4},
  {x:515.5,y:311.9},
  {x:532.1,y:330.0},
  {x:560,y:334.2},
  {x:544.1,y:310.5},
  {x:506.9,y:334.8},
  {x:553.6,y:304.8},
  {x:534.8,y:338.9},
  {x:548.3,y:340.7},
  {x:511.3,y:322.2},
  {x:478.8,y:332.9},
  {x:505.2,y:360},
  {x:494.7,y:334.8},
  {x:470.8,y:324.1},
  {x:516.5,y:342.4},
  {x:546.2,y:329.3},
  {x:482.1,y:336.9},
  {x:522.9,y:337.4},
  {x:492.5,y:347.0},
  {x:512.2,y:340.5},
  {x:553.7,y:287.6},
  {x:531.4,y:305},
  {x:530.5,y:276.3},
  {x:527.5,y:298.5},
  {x:527.7,y:286.5},
  {x:551.9,y:273.6},
  {x:486.2,y:283.7},
  {x:530.2,y:272.4},
  {x:544.6,y:287.6},
  {x:502.6,y:286.5},
  {x:520.6,y:261.5},
  {x:535.2,y:279.4},
  {x:508.2,y:286.5},
  {x:536.0,y:272.8},
  {x:534.0,y:292.7},
  {x:509.0,y:284.8},
  {x:525.1,y:305},
  {x:483.1,y:288.7},
  {x:518.1,y:278.7},
  {x:567.8,y:279.9},
  {x:570,y:274.5},
  {x:532.9,y:273.9},
  {x:509.5,y:280.8},
  {x:518.6,y:282.5},
  {x:480,y:305},
  {x:521.2,y:301.8},
  {x:502.3,y:283.7},
  {x:570,y:269.1},
  {x:491.4,y:273.2},
  {x:535.6,y:288.7},
  {x:554.0,y:276.8},
  {x:488.9,y:274.6},
  {x:552.9,y:285.8},
  {x:481.0,y:279.6},
  {x:556.5,y:305},
  {x:537.6,y:283.9},
  {x:497.1,y:269.5},
  {x:526.1,y:286.3},
  {x:538.1,y:274.0},
  {x:499.1,y:270.3},
  {x:499.0,y:288.0},
  {x:480,y:275.8},
  {x:535.1,y:299.0},
  {x:526.6,y:292.5},
  {x:516.0,y:270.7},
  {x:586.5,y:362.9},
  {x:619.9,y:347.3},
  {x:640,y:339.5},
  {x:612.4,y:344.6},
  {x:595.6,y:370},
  {x:630.1,y:319.0},
  {x:592.0,y:346.4},
  {x:615.7,y:319.8},
  {x:560,y:311.4},
  {x:598.6,y:338.5},
  {x:606.9,y:328.5},
  {x:575.5,y:310},
  {x:606.6,y:345.6},
  {x:619.9,y:351.9},
  {x:596.2,y:360.2},
  {x:597.3,y:330.1},
  {x:589.6,y:331.2},
  {x:560,y:342.3},
  {x:605.0,y:334.6},
  {x:585.7,y:345.6},
  {x:472.9,y:288.1},
  {x:417.3,y:277.9},
  {x:428.3,y:266.9},
  {x:426.9,y:288.5},
  {x:476.1,y:302.8},
  {x:455.9,y:275.9},
  {x:446.7,y:269.0},
  {x:437.8,y:294.3},
  {x:410.8,y:320.0},
  {x:444.2,y:256.6},
  {x:443.8,y:280.9},
  {x:430.0,y:295.1},
  {x:439.8,y:255},
  {x:401.0,y:300.1},
  {x:462.5,y:318.4},
  {x:513.1,y:400},
  {x:476.9,y:401.2},
  {x:506.5,y:431.0},
  {x:410.1,y:455},
  {x:472.5,y:401.5},
  {x:460.3,y:417.4},
  {x:453.9,y:421.1},
  {x:498.1,y:407.9},
  {x:461.1,y:452.4},
  {x:421.1,y:430.4},
  {x:457.1,y:418.0},
  {x:472.7,y:428.8},
  {x:417.0,y:451.7},
  {x:477.7,y:425.2},
  {x:427.7,y:416.7},
  {x:493.1,y:425.5},
  {x:466.1,y:425.0},
  {x:471.6,y:425.9},
  {x:476.7,y:425.0},
  {x:479.0,y:436.7},
  {x:445.9,y:415.7},
  {x:417.1,y:417.3},
  {x:415.5,y:439.4},
  {x:448.4,y:449.1},
  {x:520,y:427.8},
  {x:395.8,y:422.3},
  {x:447.4,y:407.0},
  {x:441.2,y:431.4},
  {x:433.9,y:416.9},
  {x:423.4,y:452.1},
  {x:444.4,y:416.1},
  {x:436.9,y:440.6},
  {x:426.0,y:434.1},
  {x:475.5,y:437.8},
  {x:499.0,y:419.9},
  {x:489.6,y:416.6},
  {x:436.1,y:443.9},
  {x:478.8,y:427.5},
  {x:408.3,y:435.2},
  {x:427.9,y:414.8},
  {x:427.3,y:430.9},
  {x:380,y:432.5},
  {x:456.1,y:419.5},
  {x:486.3,y:435.9},
  {x:428.8,y:418.3},
  {x:474.3,y:406.7},
  {x:438.4,y:418.8},
  {x:452.4,y:430.4},
  {x:451.3,y:443.1},
  {x:458.0,y:423.2},
  {x:407.6,y:437.4},
  {x:468.5,y:447.4},
  {x:423.8,y:427.9},
  {x:447.9,y:426.3},
  {x:450.4,y:403.9},
  {x:478.9,y:436.5},
  {x:489.6,y:455},
  {x:438.8,y:427.0},
  {x:450.3,y:454.2},
  {x:389.4,y:434.2},
  {x:398.5,y:400},
  {x:380,y:408.5},
  {x:487.4,y:415.6},
  {x:442.0,y:411.5},
  {x:471.4,y:412.3},
  {x:496.1,y:413.8},
  {x:423.2,y:429.2},
  {x:450.9,y:447.1},
  {x:454.2,y:410.9},
  {x:430.4,y:419.6},
  {x:475.4,y:432.8},
  {x:445.8,y:439.5},
  {x:431.5,y:425.6},
  {x:456.3,y:448.5},
  {x:446.6,y:422.7},
  {x:413.4,y:436.9},
  {x:429.4,y:432.2},
  {x:383.4,y:441.8},
  {x:403.4,y:416.8},
  {x:487.1,y:409.2},
  {x:447.2,y:428.5},
  {x:415.1,y:446.0},
  {x:502.5,y:400.4},
  {x:399.3,y:438.6},
  {x:404.4,y:422.2},
  {x:454.5,y:437.0},
  {x:442.2,y:428.8},
  {x:422.8,y:445.3},
  {x:432.7,y:432.2},
  {x:432.1,y:429.0},
  {x:569.5,y:422.6},
  {x:542.1,y:436.9},
  {x:621.0,y:428.6},
  {x:598.8,y:437.6},
  {x:605.2,y:429.6},
  {x:581.9,y:438.0},
  {x:577.2,y:410.4},
  {x:575.8,y:396.7},
  {x:574.8,y:431.2},
  {x:615.2,y:427.3},
  {x:605.2,y:425.0},
  {x:541.7,y:403.8},
  {x:543.5,y:404.5},
  {x:595.6,y:421.9},
  {x:593.5,y:426.1},
  {x:608.9,y:440.9},
  {x:554.0,y:420.9},
  {x:557.7,y:400.7},
  {x:596.9,y:442.8},
  {x:574.8,y:417.6},
  {x:610.5,y:395},
  {x:580.8,y:427.1},
  {x:556.4,y:445.9},
  {x:606.5,y:421.1},
  {x:572.2,y:419.2},
  {x:558.4,y:405.4},
  {x:619.8,y:440.4},
  {x:600.9,y:408.6},
  {x:640,y:454.7},
  {x:581.1,y:411.4},
  {x:546.8,y:431.3},
  {x:545.3,y:424.5},
  {x:610.4,y:402.4},
  {x:640,y:448.5},
  {x:534.8,y:403.8},
  {x:565.8,y:409.5},
  {x:566.4,y:395},
  {x:567.6,y:452.0},
  {x:538.7,y:420.9},
  {x:526.6,y:434.6},
  {x:567.7,y:454.1},
  {x:581.7,y:419.4},
  {x:592.9,y:417.4},
  {x:531.5,y:429.5},
  {x:569.3,y:427.5},
  {x:587.2,y:417.3},
  {x:588.7,y:451.1},
  {x:539.0,y:451.1},
  {x:567.1,y:413.5},
  {x:640,y:427.3},
  {x:619.5,y:437.3},
  {x:520.4,y:426.8},
  {x:557.9,y:404.9},
  {x:517.4,y:426.5},
  {x:594.2,y:430.9},
  {x:502.4,y:462.0},
  {x:485.3,y:464.4},
  {x:484.2,y:468.0},
  {x:509.4,y:461.0},
  {x:504.2,y:462.4},
  {x:509.9,y:475.1},
  {x:514.5,y:474.7},
  {x:468.7,y:466.2},
  {x:516.9,y:476.4},
  {x:470.0,y:471.6},
  {x:540.2,y:468.2},
  {x:507.6,y:474.5},
  {x:516.2,y:476.7},
  {x:511.8,y:471.5},
  {x:490.4,y:468.3},
  {x:541.3,y:468.0},
  {x:505.8,y:465.1},
  {x:529.7,y:461.5},
  {x:532.8,y:460.6},
  {x:483.6,y:472.1},
  {x:348.6,y:446.6},
  {x:374.2,y:436.8},
  {x:357.2,y:430.0},
  {x:379.6,y:451.2},
  {x:359.8,y:445.1},
  {x:323.4,y:438.0},
  {x:358.8,y:442.2},
  {x:348.4,y:423.8},
  {x:350.0,y:433.0},
  {x:315.2,y:440.4},
  {x:293.9,y:452.1},
  {x:368.4,y:441.8},
  {x:317.7,y:429.5},
  {x:340.8,y:415},
  {x:350.0,y:451.6},
];

// 1 gold Atelier Direct marker — Central, HK Island
const GOLD_DOTS: {x:number;y:number;label:string;district:string}[] = [
  {x:450,y:425,label:"Atelier Direct · Central",district:"Central, Hong Kong Island"},
];


// District labels (positioned in zoomed coordinate space)
const DISTRICT_LABELS = [
  { x: 442, y: 345, text: "KOWLOON", anchor: "middle" },
  { x: 442, y: 410, text: "HK ISLAND", anchor: "middle" },
  { x: 430, y: 378, text: "VICTORIA HARBOUR", anchor: "middle", muted: true },
];

interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  label: string;
  district: string;
}

export default function HKTailorMap() {
  const [dotsVisible, setDotsVisible] = useState(false);
  const [goldVisible, setGoldVisible] = useState(false);
  const [tooltip, setTooltip] = useState<TooltipState>({ visible: false, x: 0, y: 0, label: "", district: "" });
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setDotsVisible(true), 200);
          setTimeout(() => setGoldVisible(true), 1200);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleGoldClick = (dot: typeof GOLD_DOTS[0], svgEl: SVGSVGElement, cx: number, cy: number) => {
    const rect = svgEl.getBoundingClientRect();
    const vb = VIEW_BOX.split(" ").map(Number);
    const scaleX = rect.width / vb[2];
    const scaleY = rect.height / vb[3];
    const px = (cx - vb[0]) * scaleX;
    const py = (cy - vb[1]) * scaleY;
    setTooltip(prev =>
      prev.visible && prev.label === dot.label
        ? { ...prev, visible: false }
        : { visible: true, x: px, y: py, label: dot.label, district: dot.district }
    );
  };

  return (
    <div ref={sectionRef} style={{ position: "relative", maxWidth: "700px", margin: "0 auto" }}>
      <svg
        viewBox={VIEW_BOX}
        width="100%"
        style={{ display: "block", overflow: "hidden", maxHeight: "480px" }}
        aria-label="Hong Kong tailoring map"
        onClick={() => setTooltip(t => ({ ...t, visible: false }))}
      >
        <defs>
          <style>{`
            @keyframes goldPulse {
              0%, 100% { r: 4; opacity: 1; }
              50% { r: 6; opacity: 0.6; }
            }
            .gold-pulse { animation: goldPulse 2.5s ease-in-out infinite; }
          `}</style>
        </defs>

        {/* Background */}
        <rect x="350" y="320" width="250" height="190" fill="#f5f3ef" />

        {/* Victoria Harbour water fill */}
        <rect x="350" y="378" width="250" height="18" fill="#d8e8f0" opacity="0.5" />

        {/* Map paths */}
        {HK_PATHS.map((p, i) => (
          <path key={i} d={p.d} fill={p.fill} stroke={p.stroke} strokeWidth={p.strokeWidth} />
        ))}

        {/* Grey dots — animate in on scroll */}
        {dotsVisible && GREY_DOTS.map((dot, i) => (
          <circle
            key={i}
            cx={dot.x}
            cy={dot.y}
            r={1.8}
            fill="#9e9890"
            opacity={0.65}
            style={{
              transition: `opacity 0.4s ease ${Math.random() * 0.8}s`,
            }}
          />
        ))}

        {/* Gold Atelier Direct markers */}
        {goldVisible && GOLD_DOTS.map((dot, i) => (
          <g
            key={i}
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation();
              const svg = (e.currentTarget as SVGGElement).closest("svg") as SVGSVGElement;
              handleGoldClick(dot, svg, dot.x, dot.y);
            }}
          >
            {/* Pulse ring */}
            <circle
              cx={dot.x}
              cy={dot.y}
              r={7}
              fill="none"
              stroke="#b8943f"
              strokeWidth={1}
              opacity={0.4}
              className="gold-pulse"
            />
            {/* Gold dot */}
            <circle
              cx={dot.x}
              cy={dot.y}
              r={4}
              fill="#b8943f"
              stroke="white"
              strokeWidth={1.5}
            />
          </g>
        ))}

        {/* District labels */}
        {DISTRICT_LABELS.map((lbl, i) => (
          <text
            key={i}
            x={lbl.x}
            y={lbl.y}
            textAnchor={lbl.anchor as "middle"}
            style={{
              fontFamily: F.mono,
              fontSize: "5px",
              fill: lbl.muted ? "#a8c8d8" : "#aaa8a0",
              letterSpacing: "0.08em",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            {lbl.text}
          </text>
        ))}

        {/* < 1% annotation */}
        {goldVisible && (
          <g>
            <line x1={490} y1={372} x2={474} y2={383} stroke="#b8943f" strokeWidth={0.8} strokeDasharray="2 2" opacity={0.7} />
            <rect x={491} y={364} width={42} height={14} fill="#111" rx={1} />
            <text x={512} y={373} textAnchor="middle" style={{ fontFamily: F.mono, fontSize: "5px", fill: "#b8943f", letterSpacing: "0.1em" }}>
              &lt; 1%
            </text>
            <text x={512} y={376.5} textAnchor="middle" style={{ fontFamily: F.mono, fontSize: "3.5px", fill: "#888", letterSpacing: "0.06em" }}>
              ENTIRELY BY HAND
            </text>
          </g>
        )}
      </svg>

      {/* Tooltip */}
      {tooltip.visible && (
        <div
          style={{
            position: "absolute",
            left: `${tooltip.x}px`,
            top: `${tooltip.y - 60}px`,
            transform: "translateX(-50%)",
            backgroundColor: "#111",
            color: "#fff",
            padding: "8px 12px",
            pointerEvents: "none",
            zIndex: 10,
            minWidth: "160px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          }}
        >
          <div style={{ fontFamily: F.mono, fontSize: "8px", color: "#b8943f", letterSpacing: "0.1em", marginBottom: "3px" }}>
            {tooltip.label}
          </div>
          <div style={{ fontFamily: F.mono, fontSize: "7px", color: "#888", letterSpacing: "0.06em", marginBottom: "4px" }}>
            {tooltip.district}
          </div>
          <div style={{ fontFamily: F.mono, fontSize: "7px", color: "#666", letterSpacing: "0.06em" }}>
            BY ENQUIRY ONLY
          </div>
        </div>
      )}

      {/* Legend */}
      <div style={{
        display: "flex",
        gap: "24px",
        marginTop: "16px",
        paddingTop: "12px",
        borderTop: "1px solid #e8e4dc",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#9e9890" }} />
          <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa" }}>
            ~400 TAILORING HOUSES
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#b8943f" }} />
          <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#b8943f" }}>
            ATELIER DIRECT · ENTIRELY BY HAND
          </span>
        </div>
      </div>
    </div>
  );
}
