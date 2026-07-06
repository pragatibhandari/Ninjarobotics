/**
 * data.js — NinjaRobotics site content
 * ─────────────────────────────────────
 * All text, numbers, and lists live here.
 * To update the site, edit this file only.
 * HTML structure → index.html
 * Styles         → style.css
 * Logic          → main.js
 */

const SITE_DATA = {

  /* ── Hero stats ─────────────────────────────────────── */
  heroStats: [
    { num: "12.5Mt", label: "Construction waste annually" },
    { num: "80%+",   label: "Target pick precision" },
    { num: "73%",    label: "Authorities validated need" },
    { num: "0",      label: "Proper solutions today" },
  ],

  /* ── Ticker items ────────────────────────────────────── */
  ticker: [
    { icon: "🔩", text: "Metal Fragments" },
    { icon: "🚬", text: "Cigarette Butts" },
    { icon: "🧴", text: "Microplastics" },
    { icon: "♻️", text: "Small Construction Debris" },
    { icon: "🌊", text: "Ending Up in Oceans" },
    { icon: "🏗️", text: "Left After Cranes Clear Big Waste" },
  ],

  /* ── Problem cards ───────────────────────────────────── */
  problems: [
    {
      icon: "🏗️",
      title: "Ignored by existing equipment",
      desc: "Cranes handle bulk waste. Nothing handles the fine debris left behind on site.",
    },
    {
      icon: "🌊",
      title: "Ends up in oceans & landfills",
      desc: "Rain, wind, and runoff carry microplastics and fragments into waterways and soil.",
    },
    {
      icon: "🧑‍🏭",
      title: "Too costly to do manually",
      desc: "Manual cleanup at scale is impractical — too slow, too expensive, too inconsistent.",
    },
    {
      icon: "📉",
      title: "No proper solution exists",
      desc: "73% of public authorities confirm there is currently no adequate tool to address this.",
    },
  ],

  /* ── Solution feature list ───────────────────────────── */
  features: [
    {
      title: "Vacuum + brush system",
      desc: "Collects microplastics and fine debris close to the ground, even on rough rubble and gravel.",
    },
    {
      title: "Metal detector disc",
      desc: "Inductive sensor at the arm tip pre-screens ground before picking — catches what cameras alone miss.",
    },
    {
      title: "LiDAR + stereo camera",
      desc: "Full autonomy: site mapping, obstacle avoidance, and debris identification in real time.",
    },
    {
      title: "Self-emptying & self-charging",
      desc: "Returns to dock when the hopper is full or battery is low. Zero operator input required.",
    },
    {
      title: "Built for outdoor harshness",
      desc: "IP65+ sealed chassis, rugged tracked drive, rated for dust, rain, and uneven construction terrain.",
    },
  ],

  /* ── How it works steps ──────────────────────────────── */
  steps: [
    {
      num: 1,
      title: "Map the site",
      desc: "SLAM-based mapping builds a live layout of the construction site, updating as work progresses.",
    },
    {
      num: 2,
      title: "Scan & detect",
      desc: "LiDAR, depth camera, and metal detector work together to identify and classify debris in real time.",
    },
    {
      num: 3,
      title: "Pick & collect",
      desc: "Vacuum nozzle handles fine particles; the gripper arm targets larger discrete waste items.",
    },
    {
      num: 4,
      title: "Navigate safely",
      desc: "Workers and machinery are detected and avoided automatically — no human supervision needed.",
    },
    {
      num: 5,
      title: "Self-empty",
      desc: "Hopper-full sensor triggers return to site dustbin. Robot empties itself and resumes work.",
    },
    {
      num: 6,
      title: "Self-charge",
      desc: "Low battery triggers return to charging dock. Resumes coverage automatically when charged.",
    },
  ],

  /* ── Validation stats ────────────────────────────────── */
  validation: [
    { num: "73%",   label: "of Public Authorities and Construction Sites confirm there is no adequate small-waste solution today" },
    { num: "80%+",  label: "Target pick precision on sub-2cm debris — microplastics, metal shards, cigarette butts" },
    { num: "IP65+", label: "Sealed chassis rated for outdoor construction environments — dust, rain, and rough terrain" },
    { num: "0",     label: "Competitors currently serving this specific post-crane small-waste cleanup segment" },
  ],

  /* ── Business model cards ────────────────────────────── */
  businessModel: [
    {
      title: "Leasing",
      desc: "Construction companies subscribe to NinjaBot as a service — regular deployment, maintenance included. Predictable recurring revenue for us, zero capital expenditure for clients.",
    },
    {
      title: "Selling",
      desc: "Larger operators and municipalities purchase units outright for permanent installation on high-traffic sites. Full ownership, larger upfront revenue, long-term relationships.",
    },
  ],

  /* ── Vision phases ───────────────────────────────────── */
  phases: [
    {
      tag: "Phase 1 — Now",
      title: "Partnerships & Development",
      desc: "Build the first working prototype. Partner with robotics companies and construction firms for co-development and field validation.",
    },
    {
      tag: "Phase 2",
      title: "Adaptation & Expansion",
      desc: "Iterate on real-site learnings. Expand to new debris types and terrain. Begin leasing to early adopter sites in Finland and the Nordics.",
    },
    {
      tag: "Phase 3",
      title: "Scale & Evolve",
      desc: "Roll out across Europe and beyond. Expand to logistics, ports, and road maintenance. Build the category of autonomous micro-waste robotics.",
    },
  ],

  /* ── Team members ────────────────────────────────────── */
  /* Drop each person's photo into assets/team/ using the filename below.
     Until a real photo exists at that path, the site falls back to an
     initials avatar automatically — no code changes needed. */
  team: [
    { name: "Khaeer",     role: "Operations",        initial: "K", img: "assets/team/khaeer.jpeg" },
    { name: "Neha",       role: "Business",           initial: "N", img: "assets/team/neha.jpeg" },
    { name: "Shafay",     role: "AI / ML Engineer",   initial: "S", img: "assets/team/shafay.jpeg" },
    { name: "Zulqarnain", role: "R & D",   initial: "Z", img: "assets/team/zulqarnain.jpeg" },
    { name: "Pragati",    role: "Robotics Engineer",              initial: "P", img: "assets/team/pragati.jpeg" },
  ],

  /* ── Contact info ────────────────────────────────────── */
  contact: [
    { icon: "📍", text: "Vaasa, Finland" },
    { icon: "🤖", text: "NinjaRobotics" },
  ],

};
