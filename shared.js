// ── STORY DATA ────────────────────────────────────────────────────────────────
const RATE = 200;

const STORIES = {
  p1_arch:      { phase:1, min:8,  likely:13, max:20, type:'required',
    id:'US-01', name:'Mandanten-Architektur & BFF',
    desc:'Jedes Unternehmen erhält einen isolierten, sicheren Bereich. Alle Zugriffe laufen über eine serverseitige Backend-Schicht — kein direkter Datenbankzugriff vom Browser.',
    steps:['Datenbankschema mit Mandantenstruktur aufsetzen (tenant_id auf allen Tabellen)','Backend-Schicht (BFF) einrichten — alle API-Endpunkte laufen über den Server','Drei Umgebungen anlegen: Entwicklung, Test, Produktion','Logging und Fehlerhandling implementieren'] },

  p1_auth:      { phase:1, min:4,  likely:8,  max:14, type:'required',
    id:'US-02', name:'Login & Benutzerrollen',
    desc:'Vier Rollen mit genau definierten Rechten: Admin, OrganisationsAdmin, Führungskraft und Mitarbeiter. Nur der Admin legt neue Benutzer an — keine Selbstregistrierung.',
    steps:['Login via Supabase Auth konfigurieren','Vier Rollen mit Berechtigungsmatrix definieren','Admin-Oberfläche: Benutzer anlegen, Rollen zuweisen','Zugriffsprüfung im BFF für alle Endpunkte'] },

  p1_org:       { phase:1, min:6,  likely:10, max:18, type:'required',
    id:'US-03', name:'Organisationsstruktur & Profile',
    desc:'Mitarbeitende erfassen, Hierarchie und Reporting-Lines abbilden. Jede Person erhält eine zentrale Profilseite. OrganisationsAdmin sieht nur Struktur, keine inhaltlichen Daten.',
    steps:['Datenmodell für Mitarbeitende, Hierarchie und Teams','Oberfläche zum Erfassen und Verwalten von Personen','Reporting-Lines und Hierarchieebenen abbilden','Zentrale Profilseite pro Person aufbauen'] },

  p1_orgchart:  { phase:1, min:8,  likely:16, max:24, type:'toggle', stateKey:'p1_orgchart', defaultOn:false,
    id:'US-03b', name:'Organigramm-Ansicht',
    badge:'Premium',
    desc:'Visuelle, interaktive Darstellung der Linienhierarchie als Organigramm. Automatisch aus der bestehenden Hierarchiestruktur generiert.',
    steps:['Organigramm-Komponente aufbauen (interaktiv, zoombar)','Automatische Generierung aus bestehender Hierarchie','Klick auf Person öffnet Profilseite','Mobile-optimierte Ansicht'] },

  p1_meta_std:  { phase:1, min:8,  likely:16, max:24, type:'choice', choiceGroup:'meta', choiceVal:'std',
    id:'US-04a', name:'Sprachmuster — Standard',
    desc:'12 Metaprogramme aus dem NLP erfassen: mit Schiebereglern, Schaltern und Mehrfachauswahl. Übersichtsansicht und separater Bearbeitungsmodus.',
    steps:['12 Eingabe-Komponenten bauen (Slider bipolar, Toggle, Multi-Select)','Übersichtsansicht: alle 12 Metaprogramme kompakt','Bearbeitungsmodus: detaillierte Eingabe pro Metaprogramm','Wechsel zwischen Übersicht und Bearbeitung'] },

  p1_meta_prem: { phase:1, min:14, likely:24, max:36, type:'choice', choiceGroup:'meta', choiceVal:'prem',
    id:'US-04b', name:'Sprachmuster — Split-Layout',
    badge:'Premium',
    desc:'Übersicht aller 12 Metaprogramme links, Bearbeitung des ausgewählten rechts — nebeneinander. Auf dem Smartphone automatisch übereinander.',
    steps:['Split-Layout einrichten: Übersicht links, Bearbeitung rechts','Navigation durch Metaprogramme via Klick in der Liste','Mobile: automatisch übereinander','Eingabe-Komponenten aus Standard-Option übernommen'] },

  p1_leit_std:  { phase:1, min:6,  likely:12, max:18, type:'choice', choiceGroup:'leit', choiceVal:'std',
    id:'US-05a', name:'Führungsleitfaden — Standard',
    desc:'Stärken, Teamrollen, Werte, Führungsphase und Steuerungsknöpfe als strukturiertes Formular erfassen.',
    steps:['Felder für Stärken, Teamrollen, Werte, Führungsphase','Steuerungsknöpfe als Schieberegler (0–10)','Mehrfachauswahl für Teamrollen und Stärken','Slider-Komponenten aus Sprachmuster wiederverwendet'] },

  p1_leit_prem: { phase:1, min:4,  likely:8,  max:14, type:'choice', choiceGroup:'leit', choiceVal:'prem',
    id:'US-05b', name:'Führungsleitfaden — Split-Layout',
    badge:'Premium',
    desc:'Gleiche Split-Logik wie beim Sprachmuster: Übersicht links, Bearbeitung rechts. Setzt Split-Layout bei Sprachmuster voraus.',
    steps:['Split-Komponente aus Sprachmuster wiederverwenden','Führungsleitfaden-Felder integrieren','Navigation konsistent mit Sprachmuster'] },

  p1_hints:     { phase:1, min:6,  likely:10, max:16, type:'required',
    id:'US-06', name:'Führungshinweise & Stolpersteine',
    desc:'Persönliche Notizen der Führungskraft zum Umgang mit der Person: Stärken im Alltag, Stolpersteine, Kommunikationshinweise. Privacy-Einstellung pro Eintrag.',
    steps:['Notizen-Modul pro Person aufbauen','Privacy-Einstellung: privat oder für Team sichtbar','Systemhinweise aus Metaprogrammen einblenden','DSGVO-konforme Dokumentation'] },

  p1_vers:      { phase:1, min:10, likely:18, max:28, type:'toggle', stateKey:'p1_vers', defaultOn:true,
    id:'US-07', name:'Versionierung & Restore',
    desc:'Alle Änderungen werden automatisch protokolliert. Frühere Versionen können eingesehen und wiederhergestellt werden — für alle Module.',
    steps:['Versionierung bei jeder Änderung (Timestamp + Versionsnummer)','Versionshistorie pro Datensatz anzeigen','Restore auf frühere Version','Gilt für Profile, Gespräche, Ziele und Notizen'] },

  p1_qr:        { phase:1, min:3,  likely:6,  max:10, type:'toggle', stateKey:'p1_qr', defaultOn:true,
    id:'US-10', name:'Einladungslink & QR-Code',
    desc:'Mitarbeitende per Link oder QR-Code in einen bestimmten Bereich einladen — ohne vorab registriert zu sein.',
    steps:['Einladungslink mit Ablaufdatum generieren','QR-Code aus Link erzeugen','Link führt direkt zum Zielbereich','Gast-Zugang ohne Registrierung'] },

  p1_priv:      { phase:1, min:4,  likely:8,  max:14, type:'required',
    id:'US-11', name:'Privacy & DSGVO',
    desc:'Niemand sieht die eigene Fremdbewertung — das ist eine Systemregel. Einwilligungen werden dokumentiert, Widersprüche protokolliert.',
    steps:['Systemregel: Sichtsperre eigener Fremdbewertungen','Widerspruchs-Flag für Mitarbeitende','Einwilligungs-Timestamps dokumentieren','BFF-Middleware prüft alle Datenzugriffe'] },

  p1_ui:        { phase:1, min:4,  likely:8,  max:14, type:'required',
    id:'US-12', name:'Responsives Design-System',
    desc:'Einheitliches Design, abgeleitet von der bestehenden Coach-Website. Funktioniert auf Desktop, Tablet und Smartphone.',
    steps:['Design-System aus Coach-Website ableiten (via Superdesign + MCP)','Farben, Typografie und Komponenten festlegen','Mobile-First: alle Oberflächen für Smartphone optimiert','Design-Token als Grundlage für alle weiteren Screens'] },

  // Phase 2
  p2_prep:      { phase:2, min:8,  likely:16, max:24, type:'toggle', stateKey:'p2_prep', defaultOn:true,
    id:'US-13', name:'Gesprächsvorbereitung',
    desc:'Führungskraft und Mitarbeiter bereiten das Gespräch asynchron vor. Jeder füllt seinen Teil aus — der andere sieht ihn erst beim gemeinsamen Abgleich.',
    steps:['Gespräch anlegen mit Template-Auswahl','Führungskraft füllt ihren Teil aus','Mitarbeiter füllt seinen Teil aus (Sichtsperre bis zum Abgleich)','Status-Tracking: Entwurf · Bereit · Abgeschlossen'] },

  p2_align:     { phase:2, min:4,  likely:8,  max:14, type:'toggle', stateKey:'p2_align', defaultOn:true,
    id:'US-14', name:'Gesprächsabgleich & Terminplanung',
    desc:'Beide Perspektiven werden nebeneinander angezeigt. Statuswechsel, Terminkoordination und Benachrichtigung bei Änderungen.',
    steps:['Nebeneinander-Ansicht beider Vorbereitungen','Statuswechsel und Freigabe','Terminplanung direkt im Gespräch','Benachrichtigung bei Statusänderung'] },

  p2_final:     { phase:2, min:3,  likely:6,  max:10, type:'toggle', stateKey:'p2_final', defaultOn:true,
    id:'US-15', name:'Finale Version & Druckansicht',
    desc:'Das abgeschlossene Gespräch wird bei beiden Parteien abgelegt. Druckversion direkt aus dem Browser, read-only für den Mitarbeiter.',
    steps:['Finale Version beidseitig ablegen','Read-only-Modus für Mitarbeiter nach Abschluss','Druckansicht (Browser-Print)'] },

  p2_goals:     { phase:2, min:6,  likely:10, max:16, type:'toggle', stateKey:'p2_goals', defaultOn:true,
    id:'US-16', name:'Zielmanagement',
    desc:'Ziele pro Person mit Status-Tracking. Verknüpfung zum Gespräch, Warnung bei fehlenden Maßnahmen.',
    steps:['Ziele erfassen (SMART-Felder)','Verknüpfung zu Gespräch','Status: Offen · In Bearbeitung · Erreicht','Warnung bei Zielen ohne Maßnahmen'] },

  p2_todos:     { phase:2, min:6,  likely:12, max:18, type:'toggle', stateKey:'p2_todos', defaultOn:true,
    id:'US-17', name:'ToDo-Engine',
    desc:'Aufgaben mit Verantwortlichem, Deadline und Überfälligkeitsanzeige. Zentraler Überblick über alle ToDos aus dem Gesprächskontext.',
    steps:['ToDo anlegen: Verantwortlicher + Deadline','Owner: Führungskraft oder Mitarbeiter','Überfälligkeitsanzeige und Erinnerungslogik','ToDo-Zentrale: Meine / MA / Überfällige'] },

  p2_tmpl:      { phase:2, min:4,  likely:8,  max:14, type:'toggle', stateKey:'p2_tmpl', defaultOn:true,
    id:'US-18', name:'Template-System',
    desc:'Gesprächsvorlagen als Markdown — pro Mandant anpassbar. Standardvorlagen sind enthalten, eigene können hochgeladen werden.',
    steps:['Standardvorlagen mitliefern (Entwicklungsgespräch, Zielvereinbarung, 1:1)','Upload eigener Vorlagen als Markdown','Pro Mandant isoliert konfigurierbar'] },

  // Phase 3
  p3_anon:      { phase:3, min:7,  likely:14, max:22, type:'toggle', stateKey:'p3_anon', defaultOn:true, kiBase:true,
    id:'US-20', name:'KI-Anonymisierung (Basis)',
    desc:'Technische Grundlage für alle KI-Features. Freitexte und Namen werden vor der KI-Verarbeitung anonymisiert — Klarnamen verlassen das System nie.',
    steps:['Personenbezogene Felder vor KI-Aufruf anonymisieren (NER)','IDs statt Klarnamen in KI-Prompts','Serverseitige Rückübersetzung der KI-Antwort','DSGVO-konform: keine Klarnamen an externe KI-API'] },

  p3_ki_meta:   { phase:3, min:12, likely:26, max:38, type:'toggle', stateKey:'p3_ki_meta', defaultOn:true, kiFeature:true,
    id:'US-08', name:'KI-Vorschläge: Metaprogramme & Stärken',
    desc:'Die KI analysiert das Merkmalsprofil und schlägt passende Teamrollen und Stärken vor — mit Begründung. Vorschläge können übernommen oder verworfen werden.',
    steps:['Metaprogramm-Werte und Führungsprofil als KI-Kontext aufbereiten','KI-Analyse: passende Teamrollen und Stärken ermitteln','Vorschläge mit Begründung anzeigen','Übernahme ins Profil mit einem Klick'] },

  p3_staerken:  { phase:3, min:12, likely:21, max:34, type:'toggle', stateKey:'p3_staerken', defaultOn:true, kiFeature:true,
    id:'US-09', name:'KI-Stärkentest',
    desc:'Ein KI-Dialog führt durch einen strukturierten Stärkentest. Das Ergebnis wird ins Profil übernommen oder per E-Mail versandt (für Gäste ohne Account).',
    steps:['KI-Dialog: strukturierter Fragebogen zur Stärken-Ermittlung','Chat-UI aufbauen (wiederverwendbar für KI-Chat)','Ergebnis für eingeloggte User ins Profil','Nicht eingeloggte User erhalten Auswertung per E-Mail'] },

  p3_chat:      { phase:3, min:8,  likely:16, max:27, type:'toggle', stateKey:'p3_chat', defaultOn:true, kiFeature:true,
    id:'US-19', name:'KI-Assistenz Chat',
    desc:'Kontextsensitiver KI-Chat pro Person. Die KI kennt Merkmale, letzte Gespräche, Ziele und offene ToDos — und hilft bei Gesprächsvorbereitung und Formulierungen.',
    steps:['Chat-Oberfläche pro Person','Automatischer Kontext: Merkmale, Gespräche, Ziele, ToDos','Funktionen: Vorbereitung, Formulierungshilfe, Plausibilisierung','Datenschutz via KI-Anonymisierung (US-20)'] },

  p3_ki_hints:  { phase:3, min:8,  likely:12, max:18, type:'toggle', stateKey:'p3_ki_hints', defaultOn:false, kiFeature:true,
    id:'US-06b', name:'KI-Vorschläge Führungshinweise',
    badge:'Optional',
    desc:'Die KI schlägt automatisch Führungshinweise basierend auf dem Merkmalsprofil vor. Ergänzung zu den manuellen Notizen.',
    steps:['KI analysiert Merkmalsprofil und generiert Hinweise','Vorschläge zur Übernahme anzeigen','Anonymisierung via US-20'] },

  p3_smart:     { phase:3, min:6,  likely:10, max:16, type:'toggle', stateKey:'p3_smart', defaultOn:false, kiFeature:true,
    id:'US-16b', name:'SMART-Check per KI-Dialog',
    badge:'Optional',
    desc:'Geführter KI-Dialog zur Überprüfung und Schärfung von Zielen nach dem SMART-Prinzip.',
    steps:['KI-Dialog: Ziel schrittweise auf SMART-Kriterien prüfen','Iterative Verbesserung der Zielformulierung','Ergebnis im Ziel speichern'] },

  p3_migration: { phase:3, min:14, likely:22, max:36, type:'toggle', stateKey:'p3_migration', defaultOn:true,
    id:'US-21', name:'Datenmigration V2 → V3',
    desc:'Alle bestehenden Daten werden aus der V2-Datenbank in die neue V3-Struktur überführt. Mit Validierung und Rollback-Möglichkeit.',
    steps:['V2-Datenbankstruktur analysieren und Mapping definieren','ETL-Script für alle Tabellen schreiben','Mandanten-Zuordnung klären und umsetzen','Validierung, Testlauf und Rollback-Strategie'] },

  p3_audit:     { phase:3, min:4,  likely:8,  max:14, type:'toggle', stateKey:'p3_audit', defaultOn:true,
    id:'US-22', name:'Audit-Log & Monitoring',
    desc:'Lückenlose Protokollierung aller relevanten Aktionen. Admin-Ansicht für Compliance-Prüfungen und Basis-Monitoring.',
    steps:['Append-only Log für alle relevanten Aktionen','Admin-Ansicht für Audit-Log','Basis-Monitoring: Fehlerraten und Performance'] },

  p3_crypt:     { phase:3, min:4,  likely:8,  max:14, type:'toggle', stateKey:'p3_crypt', defaultOn:true,
    id:'US-23', name:'Feldverschlüsselung (DSGVO)',
    desc:'Personenbezogene Daten werden verschlüsselt gespeichert. Schlüsselverwaltung nach DSGVO-Anforderungen.',
    steps:['Personenbezogene Felder identifizieren','Verschlüsselung at rest implementieren','Key Management nach DSGVO'] },

  p3_launch:    { phase:3, min:8,  likely:14, max:22, type:'toggle', stateKey:'p3_launch', defaultOn:true,
    id:'US-24', name:'Abnahme, Launch & Einweisung',
    desc:'Produktions-Deployment, Abnahme-Tests mit dem Auftraggeber, Einweisung aller Rollen und Kurzanleitungen.',
    steps:['Produktions-Deployment und finale Tests','Abnahme mit Auftraggeber','Einweisung für alle Rollen (Admin, FK, MA)','Kurzanleitungen erstellen'] },
};

// ── STATE ────────────────────────────────────────────────────────────────────
const DEFAULT_STATE = {
  phase2: true, phase3: true,
  meta: 'std', leit: 'std',
  p1_orgchart: false,
  p1_vers: true, p1_qr: true,
  p2_prep: true, p2_align: true, p2_final: true, p2_goals: true, p2_todos: true, p2_tmpl: true,
  p3_anon: true, p3_ki_meta: true, p3_staerken: true, p3_ki_hints: false, p3_smart: false,
  p3_chat: true, p3_migration: true, p3_audit: true, p3_crypt: true, p3_launch: true,
};

function loadState() {
  try {
    const s = localStorage.getItem('losv3_state');
    if (s) return { ...DEFAULT_STATE, ...JSON.parse(s) };
  } catch(e) {}
  return { ...DEFAULT_STATE };
}

function saveState(state) {
  localStorage.setItem('losv3_state', JSON.stringify(state));
}

// ── ACTIVE CHECK ─────────────────────────────────────────────────────────────
function isActive(key, s, state) {
  if (s.type === 'required') return true;
  if (s.type === 'choice') {
    const phaseOn = s.phase === 1 ? true : state[`phase${s.phase}`];
    return phaseOn && state[s.choiceGroup] === s.choiceVal;
  }
  if (s.type === 'toggle') {
    const phaseOn = s.phase === 1 ? true : state[`phase${s.phase}`];
    // US-20 (kiBase): required if any ki feature is active in phase 3
    if (s.kiBase) {
      const kiActive = Object.entries(STORIES).some(([k2, s2]) => s2.kiFeature && state[`phase${s2.phase}`] && state[s2.stateKey]);
      return phaseOn && (state[s.stateKey] || kiActive);
    }
    return phaseOn && state[s.stateKey];
  }
  return false;
}

// ── MONTE CARLO ──────────────────────────────────────────────────────────────
function triangular(min, likely, max) {
  const u = Math.random();
  const fc = (likely - min) / (max - min);
  return u < fc
    ? min + Math.sqrt(u * (max - min) * (likely - min))
    : max - Math.sqrt((1 - u) * (max - min) * (max - likely));
}

function simulate(activeStories, n = 50000) {
  const results = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    let t = 0;
    for (const s of activeStories) t += triangular(s.min, s.likely, s.max);
    results[i] = t * RATE;
  }
  results.sort();
  return results;
}

function percentile(sorted, p) {
  return sorted[Math.floor(sorted.length * p / 100)];
}

// ── FORMATTING ───────────────────────────────────────────────────────────────
function fmt(n) {
  return new Intl.NumberFormat('de-DE', { style:'currency', currency:'EUR', maximumFractionDigits:0 }).format(n);
}

function fmtPT(h) {
  const pt = Math.round(h / 8 * 2) / 2;
  return pt.toLocaleString('de-DE') + ' PT';
}

// ── PHASE TOTALS ─────────────────────────────────────────────────────────────
function phaseLikely(phase, state) {
  return Object.entries(STORIES)
    .filter(([k, s]) => s.phase === phase && isActive(k, s, state))
    .reduce((sum, [, s]) => sum + s.likely, 0) * RATE;
}
