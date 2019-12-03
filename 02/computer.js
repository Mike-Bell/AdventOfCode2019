const run = nums => {
    nums = [...nums];
    let position = 0;
    while (true) {
        const opcode = nums[position];
        const p1 = nums[position + 1];
        const p2 = nums[position + 2];
        const p3 = nums[position + 3];
        
        if (opcode == 99) {
            break;
        } else if (opcode == 1) {
            nums[p3] = nums[p2] + nums[p1];
        } else if (opcode == 2) {
            nums[p3] = nums[p2] * nums[p1];
        }

        position += 4;
        if (position >= nums.length){
            break;
        }
    }

    return nums[0];
};

const applyNounAndVerb = (nums, noun, verb) => {
    nums = [...nums];
    nums[1] = noun;
    nums[2] = verb;
    return nums;
};

module.exports = {
    run,
    applyNounAndVerb
};