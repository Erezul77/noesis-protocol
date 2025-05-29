# 🧠 Noēsis Affective Clarity Engine

A modular system integrating Spinoza-inspired metaphysics into an emotional-intellectual engine for reflection evaluation and ψ-state emergence.

## 🧬 Features

### 1. Epistemic Adequacy (ψ)
- Each reflection is scored by its clarity, coherence, and conceptual adequacy.
- Ranges from 0 to 1.

### 2. Emotional Power (ΔP)
- User responses to reflections are measured for directional affect (joy vs. sadness).
- Reflects an increase or decrease in power of action.

### 3. Affective Adequacy (Aₐ)
- Composite score:
  ```ts
  Aₐ(Rₙ) = ψ(Rₙ) + Σ ΔP(Rₙ, Fₘ)
  ```
- Measures the total clarity-emotion alignment of a reflection.

### 4. ψ-State Explorer
- Detects transcendental states where:
  - ψ ≥ 0.9
  - ΔP ≥ 0.9
  - Aₐ ≥ 1.5

### 5. Reflection Graph
- Plots ψ, ΔP, and Aₐ over time.
- Visual tracker of emergence, noise, and clarity trends.

### 6. IPFS + Smart Contract Sync
- Reflections are submitted via `submitReflectionToIPFS`.
- Indexed on Ethereum via `writeReflectionToChain`.

### 7. Sort Engine
- Sorts reflections by composite:
  ```ts
  A_total = wψ·ψ + wΔP·ΔP
  ```
- Prioritizes most meaningful reflections.

---

## 📁 File Structure

```
components/
├─ ReflectionGraph.tsx         # Visualization of ψ, ΔP, Aₐ
├─ PsiStateExplorer.tsx        # Highlights ψ-state reflections

utils/
├─ sortReflections.ts          # Ranks reflections by clarity/emotion
├─ submitReflection.ts         # IPFS + Ethereum logic

models/
├─ Reflection.ts               # Reflection data model (ψ, ΔP, Aₐ, text, id)
```

---

## 🚀 Future Directions
- Persona-specific weightings
- AI-based emotional scoring
- Adequacy networks and clustering
- ψ-path navigation to trace user transformation

---

## 🧾 Philosophical Foundation
Built on the metaphysics of Baruch Spinoza:
- Reflections ≈ finite modes
- ψ ≈ adequacy of idea
- ΔP ≈ affective modulation
- Aₐ ≈ active empowerment
- ψ-state ≈ glimpse into Amor Dei Intellectualis

Noēsis is not just an app.
It’s a portal to **thinking with nature.**
