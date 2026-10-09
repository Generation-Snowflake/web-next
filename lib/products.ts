// Products GSF sells off the shelf (hardware kits and robots). Custom
// engineering work lives in lib/services.ts.
//
// Sources: GSF's own sales deck (Makerzoid prices, piece/model counts,
// package contents) and the manufacturers' docs (SKUs, XLeRobot and
// SO-101 specs, checked 2026-09-28). Check prices here before publishing.
//
// Armo and ArmoGo are GSF's names for its SO-101 and XLeRobot builds; their
// media stay under /public/products/lerobot and /public/products/xlerobot.
//
// Images live in /public/products/<slug>/. Makerzoid photos are the
// manufacturer's product shots. SO-101 and XLeRobot photos and 3D models come
// from the open-source projects (Apache-2.0); keep `credits` on those pages.
// See public/products/lerobot/so101-ATTRIBUTION.txt.

export type Spec = { label: string; value: string };

/** A photo with its alt text. */
export type Photo = { src: string; alt: string };

/** Interactive 3D model shown on the product page. */
export type Model3D = {
  /** Draco-compressed GLB under /public/models. */
  src: string;
  /** Which procedural joint motion to play. */
  kind: "so101" | "xlerobot";
  /** Still image shown while the model loads, or if WebGL is missing. */
  poster: string;
  /** What the figure shows, for the caption and aria-label. */
  label: string;
};

/** A yes/no line item, e.g. "Thai-language lesson files: no". */
export type Extra = { label: string; included: boolean };

export type ProductModel = {
  /** Stable id used in quote links: /contact?product=<id> */
  id: string;
  name: string;
  /** Manufacturer SKU, shown datasheet-style. */
  sku?: string;
  /** Price in Thai baht. Undefined = price on request. */
  priceTHB?: number;
  tagline: string;
  /** Short ribbon, e.g. "Most complete". */
  badge?: string;
  audience: string;
  highlights: string[];
  specs: Spec[];
  inTheBox?: string[];
  extras?: Extra[];
  image?: string;
  /** Extra photos of this model; the first is usually `image`. */
  gallery?: Photo[];
};

export type ProductGroup = "education" | "research" | "software";

/** Section headings for the product groups, in page order. */
export const productGroups: { id: ProductGroup; title: string; description: string }[] = [
  { id: "education", title: "For schools and kids", description: "Robot kits and an online platform for learning to code and build robots." },
  { id: "research", title: "For research labs", description: "Open-source robots for AI and robot-learning research and teaching." },
  { id: "software", title: "Software", description: "Tools we build and run ourselves." },
];

export type Product = {
  slug: string;
  group: ProductGroup;
  /** Still being built / tested with early users: no price, early-access CTA. */
  status?: "in-development";
  /** Live site for software products. */
  siteUrl?: string;
  name: string;
  /** Who makes it. */
  maker: string;
  category: string;
  tagline: string;
  /** 1–2 sentences for cards. */
  summary: string;
  /** Paragraphs for the detail page. */
  overview: string[];
  audience: string[];
  features: { title: string; description: string }[];
  /** Specs shared by every model of this product. */
  specs: Spec[];
  inTheBox: string[];
  useCases: string[];
  /** Ordered entry level → most advanced. */
  models: ProductModel[];
  /** Main photo (cards, Open Graph, first gallery image). */
  image?: string;
  imageAlt?: string;
  /** Detail page gallery, main photo first. */
  gallery: Photo[];
  /** Drawn product illustration used where a software product has no photo. */
  illustration?: "taktic";
  model3d?: Model3D;
  /** Photo / model credit line, for open-source project media. */
  credits?: string;
  links: { label: string; href: string }[];
  /** Tint for the placeholder art. */
  accent: "ice" | "teal" | "violet";
  /** Short note shown near prices / quotes. */
  priceNote?: string;
};

export const products: Product[] = [
  {
    slug: "makerzoid",
    group: "education",
    name: "Makerzoid",
    maker: "Makerzoid",
    category: "STEM robot kits",
    tagline: "Build a robot from bricks, then code it from a phone.",
    summary:
      "Brick-built robot kits for kids, coded with drag-and-drop blocks in the Makerzoid app. Four kits, from a 26-model starter to a competition set with remote control.",
    overview: [
      "Kids build a robot, car or machine from the bricks, follow the build guide in the Makerzoid app, and then program it with drag-and-drop blocks (Scratch, or ScratchJr on Smart Robot). The app runs on iOS and Android.",
      "We stock four kits. Superbot and Smart Robot Premium are good first kits. Robot Master Premium has the most to learn from: 600+ parts, two motors, two sensors and the full 47-lesson video course. Superbot Premium adds a servo, a grayscale sensor and a Bluetooth remote for competition-style projects.",
      "Robot Master Premium and Superbot Premium also come with our Thai-language lesson files on robot basics.",
    ],
    audience: ["Primary & secondary schools", "Tutoring and coding centres", "Parents buying for kids"],
    features: [
      {
        title: "One box, many robots",
        description:
          "Each kit builds dozens to hundreds of models. The build steps are in the app, so nobody has to keep track of a paper manual.",
      },
      {
        title: "Block coding that grows with the kid",
        description:
          "Smart Robot uses ScratchJr, which works before a child can read well. The other kits use Scratch blocks: loops, conditions and sensor input.",
      },
      {
        title: "Real sensors, not just motors",
        description:
          "IR sensors on every kit. Superbot Premium adds a grayscale sensor for line following and a servo for grippers and arms.",
      },
      {
        title: "Parts you can reuse",
        description:
          "The same bricks are used lesson after lesson, which keeps the cost per student down for schools.",
      },
    ],
    specs: [
      { label: "Programming", value: "Makerzoid app: Scratch blocks (ScratchJr on Smart Robot)" },
      { label: "App", value: "iOS & Android" },
      { label: "Connection", value: "Bluetooth" },
    ],
    inTheBox: [],
    useCases: [
      "Robotics clubs and after-school classes",
      "STEM lessons in primary and lower-secondary school",
      "Robot competitions for young students",
      "Learning at home",
    ],
    models: [
      {
        id: "makerzoid-superbot",
        name: "Superbot",
        sku: "MKZ-ID-SPB",
        priceTHB: 2400,
        tagline: "A starter kit with two motors, driven by joystick or code.",
        audience: "First kit, home use",
        highlights: ["300+ parts, 26 builds", "2 built-in motors, 2 IR sensors", "Joystick control + Scratch"],
        specs: [
          { label: "Parts", value: "300+" },
          { label: "Builds", value: "26" },
          { label: "Controller", value: "Controller V1.1" },
          { label: "Motors", value: "2 built-in" },
          { label: "Sensors", value: "2 × IR" },
          { label: "Coding", value: "Scratch" },
        ],
        inTheBox: [
          "Controller V1.1 × 1",
          "Built-in motor × 2",
          "IR sensor × 2",
          "Hub × 4",
          "Tyre × 4",
          "Build manual × 1",
        ],
        extras: [
          { label: "Build manual", included: true },
          { label: "Video lessons", included: false },
          { label: "Thai lesson files", included: false },
          { label: "Joystick control", included: true },
          { label: "Scratch coding", included: true },
        ],
        image: "/products/makerzoid/superbot-1.webp",
        gallery: [
          { src: "/products/makerzoid/superbot-1.webp", alt: "Makerzoid Superbot box with the four-wheel car build" },
          { src: "/products/makerzoid/superbot-2.webp", alt: "Superbot builds, with phone joystick and Scratch coding on a tablet" },
          { src: "/products/makerzoid/superbot-3.webp", alt: "Two kids playing with Superbot car builds" },
          { src: "/products/makerzoid/superbot-4.webp", alt: "Superbot robot build with its two IR sensors and host controller" },
        ],
      },
      {
        id: "makerzoid-smart-robot-premium",
        name: "Smart Robot Premium",
        sku: "MKZ-PF-PM",
        priceTHB: 2600,
        tagline: "249 builds and ScratchJr, for younger kids.",
        badge: "Youngest builders",
        audience: "Early primary",
        highlights: ["400+ parts, 249 builds", "ScratchJr picture blocks", "12 video lessons"],
        specs: [
          { label: "Parts", value: "400+" },
          { label: "Builds", value: "249" },
          { label: "Controller", value: "Controller V2" },
          { label: "Motors", value: "1 built-in" },
          { label: "Sensors", value: "1 × IR" },
          { label: "Coding", value: "ScratchJr" },
        ],
        inTheBox: [
          "Controller V2 × 1",
          "Built-in motor × 1",
          "IR sensor × 1",
          "Hub × 4",
          "Tyre × 4",
          "Build manual × 1",
        ],
        extras: [
          { label: "Build manual", included: true },
          { label: "Video lessons", included: true },
          { label: "Thai lesson files", included: false },
          { label: "Joystick control", included: false },
          { label: "Scratch coding", included: true },
        ],
        image: "/products/makerzoid/smart-robot-premium-1.webp",
        gallery: [
          { src: "/products/makerzoid/smart-robot-premium-1.webp", alt: "Makerzoid Smart Robot Premium box with several blue builds" },
          { src: "/products/makerzoid/smart-robot-premium-2.webp", alt: "Chameleon build with its motor, IR sensor, bricks and manual" },
          { src: "/products/makerzoid/smart-robot-premium-3.webp", alt: "Child holding a Smart Robot Premium plane build" },
          { src: "/products/makerzoid/smart-robot-premium-4.webp", alt: "A selection of the 249 Smart Robot Premium builds" },
        ],
      },
      {
        id: "makerzoid-robot-master-premium",
        name: "Robot Master Premium",
        sku: "MKZ-RM-PM",
        priceTHB: 4800,
        tagline: "600+ parts, two motors, two sensors and the full 47-lesson video course.",
        badge: "Most to learn",
        audience: "Ages 6+, classrooms",
        highlights: ["600+ parts, 301 builds", "2 motors, 2 IR sensors", "47 video lessons + Thai lesson files"],
        specs: [
          { label: "Parts", value: "600+" },
          { label: "Builds", value: "301" },
          { label: "Controller", value: "Host controller (2 motor ports, 2 sensor ports, gyro port)" },
          { label: "Motors", value: "2" },
          { label: "Sensors", value: "2 × IR distance" },
          { label: "Coding", value: "Scratch" },
          { label: "Power", value: "2 × AA (not included)" },
          { label: "Age", value: "6+" },
        ],
        inTheBox: [
          "Host controller × 1",
          "Motor × 2",
          "IR sensor × 2",
          "Tyre × 6",
          "Build manual × 1",
        ],
        extras: [
          { label: "Build manual", included: true },
          { label: "Video lessons (47)", included: true },
          { label: "Thai lesson files", included: true },
          { label: "Joystick control", included: true },
          { label: "Scratch coding", included: true },
        ],
        image: "/products/makerzoid/robot-master-premium-1.webp",
        gallery: [
          { src: "/products/makerzoid/robot-master-premium-1.webp", alt: "Makerzoid Robot Master Premium storage box" },
          { src: "/products/makerzoid/robot-master-premium-2.webp", alt: "Robot Master Premium parts tray, lesson cards and builds" },
          { src: "/products/makerzoid/robot-master-premium-4.webp", alt: "Crane build lifting a stack of tyres" },
          { src: "/products/makerzoid/robot-master-premium-5.webp", alt: "Kids coding a Robot Master build from a tablet" },
          { src: "/products/makerzoid/robot-master-premium-3.webp", alt: "Robot Master host controller, motor and distance sensor" },
        ],
      },
      {
        id: "makerzoid-superbot-premium",
        name: "Superbot Premium",
        sku: "MKZ-SPB-MS",
        priceTHB: 8600,
        tagline: "Competition kit with a servo, line sensor and Bluetooth remote.",
        badge: "Competition",
        audience: "Upper primary and up",
        highlights: ["230+ parts, 72 builds", "Servo + grayscale sensor", "Bluetooth remote control"],
        specs: [
          { label: "Parts", value: "230+" },
          { label: "Builds", value: "72" },
          { label: "Controller", value: "Host controller" },
          { label: "Motors", value: "2 built-in + 1 servo" },
          { label: "Sensors", value: "2 × rotary IR, 1 × grayscale" },
          { label: "Coding", value: "Scratch" },
          { label: "Remote", value: "Bluetooth remote control" },
        ],
        inTheBox: [
          "Host controller × 1",
          "Built-in motor × 2",
          "Servo motor × 1",
          "Rotary IR sensor × 2",
          "Grayscale sensor × 1",
          "Bluetooth remote control × 1",
          "Build manual × 1",
        ],
        extras: [
          { label: "Build manual", included: true },
          { label: "Video lessons", included: true },
          { label: "Thai lesson files", included: true },
          { label: "Remote control", included: true },
          { label: "Scratch coding", included: true },
        ],
        image: "/products/makerzoid/superbot-premium-1.webp",
        gallery: [
          { src: "/products/makerzoid/superbot-premium-1.webp", alt: "Makerzoid Superbot Master Premium storage box" },
          { src: "/products/makerzoid/superbot-premium-2.webp", alt: "Four kids building Superbot Premium robots at a table" },
          { src: "/products/makerzoid/superbot-premium-3.webp", alt: "Superbot Premium all-in-one controller and its features" },
          { src: "/products/makerzoid/superbot-premium-4.webp", alt: "Line-following build, components and Scratch coding" },
        ],
      },
    ],
    image: "/products/makerzoid/makerzoid-hero.webp",
    imageAlt: "A parent and child building Makerzoid robots and coding them on a tablet",
    gallery: [
      { src: "/products/makerzoid/makerzoid-hero.webp", alt: "A parent and child building Makerzoid robots and coding them on a tablet" },
      { src: "/products/makerzoid/robot-master-premium-4.webp", alt: "Robot Master Premium crane build lifting tyres" },
      { src: "/products/makerzoid/robot-master-premium-5.webp", alt: "Kids coding a Robot Master build from a tablet" },
      { src: "/products/makerzoid/superbot-premium-2.webp", alt: "Kids building Superbot Premium robots at a table" },
      { src: "/products/makerzoid/superbot-1.webp", alt: "Superbot box with the four-wheel car build" },
      { src: "/products/makerzoid/smart-robot-premium-1.webp", alt: "Smart Robot Premium box and builds" },
    ],
    links: [{ label: "Makerzoid (manufacturer)", href: "https://www.makerzoid.com/" }],
    accent: "teal",
    priceNote: "Prices in Thai baht. School and bulk orders: ask us for a quote.",
  },
  {
    slug: "robopark",
    group: "education",
    status: "in-development",
    // Site link hidden until robopark.fun is ready: siteUrl "https://www.robopark.fun".
    name: "RoboPark",
    maker: "GSF Robotics & AI",
    category: "Online robotics learning platform",
    tagline: "Learn to program robots in an online simulator, no hardware needed.",
    summary:
      "A robotics learning platform for kids that runs in the browser. Students code a robot in a 3D simulation, follow courses, build their own levels and take part in competitions.",
    overview: [
      "RoboPark is our own learning platform. Kids write drag-and-drop block code and watch a simulated robot run it straight away, so they can learn robotics at home or at school without buying hardware first.",
      "Courses start from the basics and work up to maze solving with motion and colour sensors. Students can also build their own levels and run their robots on them, and competition mode lets a class or a group of friends race their robots on the same course.",
      "RoboPark is in development and we're testing it with early users. If you'd like to try it with your class or your kids, tell us.",
    ],
    audience: ["Kids and beginners", "Schools and coding clubs", "Parents"],
    features: [
      {
        title: "Courses",
        description: "Step-by-step lessons from first programs to maze-solving robots. The same course we teach in our maze robot classes.",
      },
      {
        title: "Build your own levels",
        description: "Design a stage, then write a program to get the robot through it.",
      },
      {
        title: "Competition mode",
        description: "Everyone runs their robot on the same course, for friendly contests in class or at home.",
      },
      {
        title: "Online simulation",
        description: "Runs in a web browser. A 3D robot with motion and colour sensors, so there is nothing to install and no kit to buy.",
      },
    ],
    specs: [
      { label: "Runs on", value: "Web browser" },
      { label: "Coding", value: "Drag-and-drop blocks" },
    ],
    inTheBox: [],
    useCases: ["Robotics and coding lessons at school", "Practice at home between classes", "Class competitions"],
    models: [
      {
        id: "robopark",
        name: "RoboPark",
        tagline: "Online robotics learning platform",
        audience: "Kids, schools and parents",
        highlights: ["Courses", "Level builder", "Competition mode"],
        specs: [],
      },
    ],
    image: "/products/robopark/robopark-1.webp",
    imageAlt: "A robot maze in the RoboPark simulator",
    gallery: [{ src: "/products/robopark/robopark-1.webp", alt: "A robot maze in the RoboPark simulator" }],
    links: [],
    accent: "teal",
  },
  {
    slug: "armo",
    group: "research",
    name: "Armo",
    maker: "GSF Robotics & AI, built on the open-source SO-101 and LeRobot",
    category: "Robot arm kit",
    tagline: "Move one arm by hand and the other copies you. Then it learns the task.",
    summary:
      "Our leader + follower arm pair, built on the open-source SO-101 and Hugging Face's LeRobot. Teleoperate, record demonstrations and train a policy that does the task on its own.",
    overview: [
      "Armo is our build of the SO-101, the reference arm of LeRobot, Hugging Face's open-source robot learning library. It comes as a pair: you move the leader arm by hand and the follower copies it in real time.",
      "Record 50 or so demonstrations of a task, like picking up a block and putting it in a box. Train a policy such as ACT on a single GPU, and the follower does the task by itself. Datasets and models can be shared on the Hugging Face Hub.",
      "It is the cheapest serious way we know to teach robot learning. We assemble and calibrate the pair, and teach a hands-on Armo course for students, teachers and engineers.",
    ],
    audience: ["Universities & vocational colleges", "AI engineers", "Makers"],
    features: [
      {
        title: "Leader–follower teleoperation",
        description: "Guide the leader arm by hand. The follower mirrors every joint.",
      },
      {
        title: "Train real policies",
        description: "ACT, Diffusion Policy, SmolVLA, Pi0 and more, all built into LeRobot.",
      },
      {
        title: "Same calibration everywhere",
        description: "A policy trained on one Armo runs on another, so a class can share models.",
      },
      {
        title: "Open hardware",
        description: "Printable parts, STEP CAD and a MuJoCo model are all public. Broken parts are cheap to replace.",
      },
    ],
    specs: [
      { label: "Based on", value: "SO-101 open hardware (TheRobotStudio × Hugging Face)" },
      { label: "Configuration", value: "1 leader arm + 1 follower arm" },
      { label: "Joints per arm", value: "6 (5-DoF arm + gripper)" },
      { label: "Servos", value: "12 × Feetech STS3215, 12-bit magnetic encoders" },
      { label: "Follower gearing", value: "1/345 on all joints" },
      { label: "Leader gearing", value: "Mixed 1/191, 1/345, 1/147 (light to move by hand)" },
      { label: "Controller", value: "1 bus-servo board per arm, USB-C to PC" },
      { label: "Power", value: "5 V supply per arm (12 V high-torque follower optional)" },
      { label: "Host", value: "PC running LeRobot (Python): Linux, macOS or Windows" },
      { label: "Cameras", value: "Any USB webcam; RealSense supported" },
      { label: "Licence", value: "Apache-2.0" },
    ],
    inTheBox: [
      "Leader arm + follower arm",
      "12 × STS3215 servos (installed)",
      "2 × bus-servo controller boards",
      "2 × power supplies, 2 × USB-C cables",
      "4 × table clamps",
    ],
    useCases: [
      "AI and robotics courses",
      "Imitation-learning research",
      "Hackathons and workshops",
      "Testing a manipulation task before buying a bigger robot",
    ],
    models: [
      {
        id: "armo",
        name: "Armo leader + follower",
        tagline: "Complete teleoperation pair, assembled and calibrated",
        audience: "Education & research",
        highlights: ["Leader + follower arms", "6 joints each", "LeRobot ready"],
        specs: [],
      },
    ],
    image: "/products/lerobot/so101-1.webp",
    imageAlt: "Armo follower arm (SO-101) with gripper, on a desk",
    gallery: [
      { src: "/products/lerobot/so101-1.webp", alt: "Armo follower arm (SO-101) with gripper, on a desk" },
      { src: "/products/lerobot/so101-2.webp", alt: "Armo leader arm (SO-101) with its handle and trigger" },
      { src: "/products/lerobot/so101-3.webp", alt: "Armo gripper with a USB camera mount" },
    ],
    model3d: {
      src: "/models/so101-pair.glb",
      kind: "so101",
      poster: "/products/lerobot/so101-pair-3d-poster.webp",
      label: "3D model of the Armo leader and follower arms (SO-101)",
    },
    credits: "Photos and 3D model: TheRobotStudio / Hugging Face SO-ARM100, Apache-2.0. Model simplified and recoloured by GSF.",
    links: [
      { label: "LeRobot SO-101 docs", href: "https://huggingface.co/docs/lerobot/so101" },
      { label: "LeRobot on GitHub", href: "https://github.com/huggingface/lerobot" },
      { label: "SO-ARM100/101 hardware", href: "https://github.com/TheRobotStudio/SO-ARM100" },
    ],
    accent: "violet",
    priceNote: "Price on request. It depends on the servo option (5 V or 12 V follower) and cameras.",
  },
  {
    slug: "armogo",
    group: "research",
    name: "ArmoGo",
    maker: "GSF Robotics & AI, built on the open-source XLeRobot",
    category: "Dual-arm mobile robot",
    tagline: "Two arms, a camera head and a wheeled base, for household-task research.",
    summary:
      "Our dual-arm mobile robot, built on the open-source XLeRobot and Hugging Face LeRobot. Drive it with a gamepad, VR or leader arms, record demonstrations and train policies such as ACT and SmolVLA.",
    overview: [
      "ArmoGo puts two SO-101 arms (the same arms as Armo), a camera head with three cameras and a wheeled base on an IKEA RÅSKOG cart. It runs on the LeRobot stack, so anything you learn on a tabletop Armo carries over.",
      "It is a research and teaching platform, not a finished consumer robot. Expect to write Python. In return you get a mobile manipulator for a fraction of the usual price, with open hardware, URDFs and a simulator.",
      "We can supply the kit, assemble and calibrate it, and get your first dataset recorded. We also teach a hands-on ArmoGo course. The IKEA cart, battery and Raspberry Pi are sourced separately.",
    ],
    audience: ["University labs", "Robotics & AI startups", "Experienced makers"],
    features: [
      {
        title: "Two arms, one base",
        description: "Two 6-joint SO-101 arms with grippers, a 2-servo camera head and a mobile base.",
      },
      {
        title: "Many ways to drive it",
        description: "Keyboard, Xbox or Switch Joy-Con controllers, SO-101 leader arms, or a Meta Quest headset.",
      },
      {
        title: "Built on LeRobot",
        description:
          "Record datasets in the LeRobot format and train ACT or SmolVLA. Community recipes exist for pi0.5.",
      },
      {
        title: "Open source (Apache-2.0)",
        description: "3D models, URDFs, bill of materials and code are all public. You can repair and modify everything.",
      },
    ],
    specs: [
      { label: "Based on", value: "XLeRobot open-source project (Apache-2.0)" },
      { label: "Arms", value: "2 × SO-101, 6 joints each incl. gripper" },
      { label: "Actuators", value: "Feetech STS3215 12 V servos" },
      { label: "Head", value: "2-servo camera head" },
      { label: "Cameras", value: "2 wrist + 1 head (RealSense optional)" },
      { label: "Reach", value: "≈ 40 cm per arm" },
      { label: "Payload", value: "≈ 0.6–1 kg per arm" },
      { label: "Workspace height", value: "≈ 0.5–1.25 m from the floor" },
      { label: "Compute", value: "Your laptop/PC; Raspberry Pi 5 optional" },
      { label: "Power", value: "Portable power station over USB-C (≈ 180 W max draw)" },
      { label: "Software", value: "Hugging Face LeRobot, ManiSkill sim, Python" },
      { label: "Licence", value: "Apache-2.0" },
    ],
    inTheBox: [
      "2 × SO-101 follower arms, assembled (12 V servos)",
      "Base expansion: 4 servos, 2 drive wheels, printed parts and fasteners",
      "3 × 2 MP camera modules",
      "2 × 12 V power supplies",
      "Not included: IKEA cart, battery, Raspberry Pi, RealSense",
    ],
    useCases: [
      "Imitation learning and VLA research",
      "Collecting teleoperation datasets",
      "University robotics courses",
      "Prototyping home and service robot tasks",
    ],
    models: [
      {
        id: "armogo",
        name: "ArmoGo dual-arm kit",
        tagline: "Arms + base expansion, the current dual-wheel version",
        audience: "Research labs & universities",
        highlights: ["2 × SO-101 arms", "Dual-wheel base", "LeRobot compatible"],
        specs: [],
      },
    ],
    image: "/products/xlerobot/xlerobot-1.webp",
    imageAlt: "ArmoGo (XLeRobot) on an IKEA cart with both arms raised and the camera head up",
    gallery: [
      { src: "/products/xlerobot/xlerobot-1.webp", alt: "ArmoGo (XLeRobot) on an IKEA cart with both arms raised and the camera head up" },
      { src: "/products/xlerobot/xlerobot-2.webp", alt: "Close-up of the two ArmoGo arms and camera head" },
      { src: "/products/xlerobot/xlerobot-4.webp", alt: "ArmoGo holding a can in one gripper and a cup in the other" },
      { src: "/products/xlerobot/xlerobot-3.webp", alt: "ArmoGo (XLeRobot) on a blue cart in a lab" },
    ],
    model3d: {
      src: "/models/xlerobot.glb",
      kind: "xlerobot",
      poster: "/products/xlerobot/xlerobot-3d-poster.webp",
      label: "3D model of ArmoGo: cart, two SO-101 arms and camera head",
    },
    credits: "Photos and 3D model: XLeRobot project (github.com/Vector-Wangel/XLeRobot), Apache-2.0.",
    links: [
      { label: "XLeRobot on GitHub", href: "https://github.com/Vector-Wangel/XLeRobot" },
      { label: "XLeRobot docs", href: "https://xlerobot.readthedocs.io/" },
    ],
    accent: "ice",
    priceNote: "Price on request. It depends on the kit version, import costs and whether you want it assembled.",
  },
  {
    slug: "taktic",
    group: "software",
    status: "in-development",
    siteUrl: "https://taktic.gsfrobotics.com",
    name: "Taktic",
    maker: "GSF Robotics & AI",
    category: "Project management tool",
    tagline: "A task tracker for software and robotics teams. Simpler than Jira.",
    summary:
      "Our own project tracker: a drag-and-drop Kanban board, sprints and a backlog, a timeline, docs and per-project progress. It also works as an MCP server, so an AI assistant can work the board with you.",
    overview: [
      "Taktic is the task tracker we built for our own teams, and the one we run our software and robotics projects in. It is meant to be easier than Jira: projects, a board and sprints, with little else in the way.",
      "Each project has its own members, each one a PM or a Dev, a Kanban board, a backlog for planning sprints, a timeline with milestones, and docs with version history. My Work collects everything assigned to you across projects, and a share link gives a client a read-only page with the project's progress.",
      "Taktic is also an MCP server. Connect Claude Code, Claude Desktop, Cursor or VS Code with a personal token, and the assistant can read the board, search, and create or update tasks, with exactly the permissions of the person who owns the token.",
      "It is being tested with early users. If your team would like to try it, get in touch.",
    ],
    audience: ["Software and robotics teams", "Companies with a few dev teams", "Project managers"],
    features: [
      {
        title: "Kanban board",
        description:
          "To do, In progress, In review and Done. Drag cards between columns; each card shows its key, priority and assignee, and overdue work stands out.",
      },
      {
        title: "Sprints and backlog",
        description: "Plan the next sprint by dragging tasks out of the backlog, then start it and close it from the board.",
      },
      {
        title: "Tasks with the details",
        description: "Comments, checklists, subtasks, attachments and links between tasks, with an activity history on each one.",
      },
      {
        title: "Timeline and docs",
        description: "Milestones on a project timeline, and project docs in a rich-text editor with version history and an archive.",
      },
      {
        title: "Progress you can share",
        description:
          "Per-project progress and analytics for PMs. A share link gives a client a read-only status page without an account.",
      },
      {
        title: "My Work and search",
        description: "Everything assigned to you or created by you, across every project, plus search across projects and keyboard shortcuts.",
      },
      {
        title: "Roles and permissions",
        description:
          "Admin and member accounts, and PM or Dev on each project. Every read and write is checked on the server.",
      },
      {
        title: "An MCP server for AI assistants",
        description:
          "Ten tools for projects, the board, search, tasks, comments and attachments. The setup page fills in the URL and token for your client.",
      },
    ],
    specs: [
      { label: "Runs on", value: "Web browser, desktop and phone" },
      { label: "Accounts", value: "Email and password; an admin creates users" },
      { label: "Roles", value: "Admin / Member, plus PM / Dev per project" },
      { label: "Views", value: "Board, Backlog, Sprints, Timeline, Docs, Analytics, Activity" },
      { label: "AI assistants", value: "MCP server: Claude Code, Claude Desktop, Cursor, VS Code" },
      { label: "Appearance", value: "Light and dark mode" },
    ],
    inTheBox: [],
    useCases: [
      "Running sprints for a software team",
      "Tracking a robot build, part by part",
      "Showing a client project progress through a share link",
      "Letting an AI coding assistant pick up and update tasks",
    ],
    models: [
      {
        id: "taktic",
        name: "Taktic",
        tagline: "Project management tool",
        audience: "Teams",
        highlights: ["Kanban board, sprints and backlog", "Web app", "MCP server"],
        specs: [],
      },
    ],
    illustration: "taktic",
    gallery: [],
    links: [{ label: "taktic.gsfrobotics.com", href: "https://taktic.gsfrobotics.com" }],
    accent: "ice",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

/** Every model across every product, for quote forms. */
export const allModels = products.flatMap((p) =>
  p.models.map((m) => ({ ...m, productSlug: p.slug, productName: p.name })),
);

/** "฿4,800" — or undefined when the price is on request. */
export function formatTHB(amount?: number) {
  return amount === undefined ? undefined : `฿${amount.toLocaleString("en-US")}`;
}

/** Lowest listed price for a product, for "from ฿…" labels. */
export function startingPrice(product: Product) {
  const prices = product.models
    .map((m) => m.priceTHB)
    .filter((p): p is number => p !== undefined);
  return prices.length ? Math.min(...prices) : undefined;
}

/** What GSF adds on top of the hardware. */
export const productSupport = [
  {
    title: "Assembly and calibration",
    description: "We can build, calibrate and test robot arms and mobile robots before they reach you.",
  },
  {
    title: "Classes and workshops",
    description: "We have taught robot basics to vocational students and run a primary-school robotics club. We can do the same for your school or team.",
  },
  {
    title: "Support in Thai",
    description: "Questions, spare parts and repairs, handled by the engineers who sold it to you.",
  },
  {
    title: "Custom software",
    description: "Need the robot to do something specific? We are a software house too.",
  },
];
