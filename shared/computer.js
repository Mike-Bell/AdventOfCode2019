const create = (arr, phaseSetting, usePhaseSetting) => {
   let pos = 0;
   let output = 0;
   let hasUsedPhaseSetting = !usePhaseSetting;
   let input = 0;
   let relativeBase = 0;

   const v = i => arr[i] || 0;
    
   const operations = {
      1: (i1, i2, i3) => {
         arr[i3] = v(i1) + v(i2);
         pos += 4;
      },
      2: (i1, i2, i3) => {
         arr[i3] = v(i1) * v(i2);
         pos += 4;
      },
      3: i1 => {
         arr[i1] = hasUsedPhaseSetting ? input : phaseSetting;
         hasUsedPhaseSetting = true;
         pos += 2;
      },
      4: i1 => {
         output = v(i1);
         pos += 2;
         return true;
      },
      5: (i1, i2) => {
         pos = v(i1) != 0 ? v(i2) : pos + 3;
      },
      6: (i1, i2) => {
         pos = v(i1) == 0 ? v(i2) : pos + 3;
      },
      7: (i1, i2, i3) => {
         arr[i3] = v(i1) < v(i2) ? 1 : 0;
         pos += 4;
      },
      8: (i1, i2, i3) => {
         arr[i3] = v(i1) == v(i2) ? 1 : 0;
         pos += 4;
      },
      9: i1 => {
         relativeBase += v(i1);
         pos += 2;
      }
   };

   const parameterOperations = {
      0: i => v(i),
      1: i => i,
      2: i => v(i) + relativeBase
   };

   const run = inp => {
      input = inp || 0;
      while (true) {
         const opcode = v(pos) % 100;
         const strOpcode = `${v(pos)}`.split('').reverse();
         const indexes = [2, 3, 4].map(i => parameterOperations[+strOpcode[i] || 0](pos + i - 1));
         if (opcode == 99) {
            return {output: output, complete: true};
         }
         if (operations[opcode](...indexes)) {
            return {output: output, complete: false};
         }
      }
   };

   const runToCompletion = inp => {
      while (true) {
         const out = run(inp);
         if (out.complete) {
            return out.output;
         }
      }
   };

   const runToCompletionWithCompleteOutputHistory = inp => {
      const outputs = [];
      while (true) {
         const out = run(inp);
         outputs.push(out.output);
         if (out.complete) {
            return outputs;
         }
      }
   };

   const getElementZero = () => arr[0];

   return {run, runToCompletion, getElementZero, runToCompletionWithCompleteOutputHistory};
};

module.exports = {create};