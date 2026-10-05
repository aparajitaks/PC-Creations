/**
 * lottie-data.ts
 * ─────────────────────────────────────────────────────────────
 * Lightweight, self-contained Bodymovin Lottie JSON animation
 * definitions adhering strictly to the brand palette:
 *   - Black:         #000000
 *   - Off-White:     #F7F8FA
 *   - Vibrant Orange:#FF9D00
 *   - Electric Blue: #3155E7
 *
 * No external network fetches required.
 */

/* ── 1. Animated Like / Heart Pulse (Orange #FF9D00) ── */
export const heartLottie = {
  v: "5.5.7",
  fr: 30,
  ip: 0,
  op: 45,
  w: 100,
  h: 100,
  nm: "LikePulse",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "HeartShape",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [50, 50, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0,  s: [90, 90, 100],  e: [115, 115, 100] },
            { t: 15, s: [115, 115, 100], e: [95, 95, 100] },
            { t: 25, s: [95, 95, 100],  e: [108, 108, 100] },
            { t: 35, s: [108, 108, 100], e: [90, 90, 100] },
            { t: 45, s: [90, 90, 100] },
          ],
        },
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "sh",
              ks: {
                a: 0,
                k: {
                  c: true,
                  i: [
                    [0, -5],
                    [-7, -7],
                    [-10, 0],
                    [0, 10],
                    [10, 0],
                    [7, -7],
                  ],
                  o: [
                    [0, 5],
                    [7, 7],
                    [10, 0],
                    [0, -10],
                    [-10, 0],
                    [-7, 7],
                  ],
                  v: [
                    [0, 16],
                    [-16, 0],
                    [-16, -10],
                    [0, -4],
                    [16, -10],
                    [16, 0],
                  ],
                },
              },
              nm: "HeartPath",
            },
            {
              ty: "fl",
              c: { a: 0, k: [1, 0.616, 0, 1] }, // #FF9D00 in normalized RGBA
              o: { a: 0, k: 100 },
              nm: "HeartFill",
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
              nm: "Transform",
            },
          ],
          nm: "Group",
        },
      ],
      ip: 0,
      op: 45,
      st: 0,
    },
  ],
};

/* ── 2. Animated Notification Bell Ping (Electric Blue & Orange) ── */
export const notificationLottie = {
  v: "5.5.7",
  fr: 30,
  ip: 0,
  op: 50,
  w: 100,
  h: 100,
  nm: "NotificationPing",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Bell",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: {
          a: 1,
          k: [
            { t: 0,  s: [0],   e: [14] },
            { t: 8,  s: [14],  e: [-14] },
            { t: 18, s: [-14], e: [10] },
            { t: 28, s: [10],  e: [-6] },
            { t: 38, s: [-6],  e: [0] },
            { t: 50, s: [0] },
          ],
        },
        p: { a: 0, k: [50, 48, 0] },
        a: { a: 0, k: [0, -12, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "rc",
              d: 1,
              s: { a: 0, k: [22, 26] },
              p: { a: 0, k: [0, 0] },
              r: { a: 0, k: 8 },
              nm: "BellBody",
            },
            {
              ty: "fl",
              c: { a: 0, k: [0.192, 0.333, 0.906, 1] }, // #3155E7
              o: { a: 0, k: 100 },
              nm: "BellFill",
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
              nm: "Transform",
            },
          ],
          nm: "Group",
        },
      ],
      ip: 0,
      op: 50,
      st: 0,
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "AlertDot",
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 0,  s: [60],  e: [100] },
            { t: 25, s: [100], e: [60] },
            { t: 50, s: [60] },
          ],
        },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [62, 34, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0,  s: [80, 80, 100],   e: [120, 120, 100] },
            { t: 25, s: [120, 120, 100], e: [80, 80, 100] },
            { t: 50, s: [80, 80, 100] },
          ],
        },
      },
      ao: 0,
      shapes: [
        {
          ty: "el",
          d: 1,
          p: { a: 0, k: [0, 0] },
          s: { a: 0, k: [12, 12] },
          nm: "Dot",
        },
        {
          ty: "fl",
          c: { a: 0, k: [1, 0.616, 0, 1] }, // #FF9D00
          o: { a: 0, k: 100 },
          nm: "DotFill",
        },
        {
          ty: "tr",
          p: { a: 0, k: [0, 0] },
          a: { a: 0, k: [0, 0] },
          s: { a: 0, k: [100, 100] },
          r: { a: 0, k: 0 },
          o: { a: 0, k: 100 },
          nm: "Transform",
        },
      ],
      ip: 0,
      op: 50,
      st: 0,
    },
  ],
};

/* ── 3. Animated Comment / Chat Bubble (Electric Blue & Off-White) ── */
export const commentLottie = {
  v: "5.5.7",
  fr: 30,
  ip: 0,
  op: 40,
  w: 100,
  h: 100,
  nm: "CommentBubble",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Bubble",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [50, 50, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0,  s: [95, 95, 100],   e: [105, 105, 100] },
            { t: 20, s: [105, 105, 100], e: [95, 95, 100] },
            { t: 40, s: [95, 95, 100] },
          ],
        },
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "rc",
              d: 1,
              s: { a: 0, k: [34, 26] },
              p: { a: 0, k: [0, 0] },
              r: { a: 0, k: 6 },
              nm: "BubbleShape",
            },
            {
              ty: "fl",
              c: { a: 0, k: [0, 0, 0, 1] }, // #000000
              o: { a: 0, k: 100 },
              nm: "BubbleFill",
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
              nm: "Transform",
            },
          ],
          nm: "Group",
        },
      ],
      ip: 0,
      op: 40,
      st: 0,
    },
  ],
};
