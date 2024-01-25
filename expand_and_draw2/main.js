"use strict";

const ps_input = document.getElementById('ps_input');
const ps_braket = document.getElementById('ps_braket');
const ps_name = document.getElementById('ps_name');
const ps_expand = document.getElementById('ps_expand');

const margin_top_node = 20;
const margin_right_node = 20;

const Seq2Pair = (vec) => {
    if (vec.length === 0)
        return [0, 0];
    const s1 = isNaN(vec[0]) ? 0 : vec[0];
    if (vec.length === 1)
        return [s1, 0];
    const s2 = isNaN(vec[1]) ? 0 : vec[1];
    return [s1, s2];
};
const Str2PS = (str) => str.slice(1, -1).split(')(').map(vec => Seq2Pair(vec.split(',').map(scl => parseInt(scl))));
const PS2Str = (ps) => '(' + ps.map(pair => pair[0] + ',' + pair[1]).join(')(') + ')';
const ExpandNormalPairSeq = (ps, braket) => {
    if (ps.length === 0)
        return ps;
    const CalcParent0 = (x) => {
        let r = x - 1;
        while (r >= 0 && ps[r][0] >= ps[x][0])
            --r;
        return r;
    };
    //末尾切るパターン
    if (CalcParent0(ps.length - 1) === -1)
        return ps.slice(0, -1);
    const parent0 = [...Array(ps.length)].map((_, x) => CalcParent0(x));
    const CalcParent1 = (x) => {
        let r = parent0[x];
        while (r >= 0 && ps[r][1] >= ps[x][1])
            r = parent0[r];
        return r;
    };
    //横に増えるパターン
    if (CalcParent1(ps.length - 1) === -1) {
        const badRoot = parent0[ps.length - 1];
        const badPart = ps.slice(badRoot, -1);
        let resultPS = ps.slice(0, badRoot);
        for (let _i = 0; _i < braket; ++_i)
            resultPS = resultPS.concat(badPart);
        return resultPS;
    }
    //縦に増えるパターン
    const badRoot = CalcParent1(ps.length - 1);
    const badPart = ps.slice(badRoot, -1);
    let resultPS = ps.slice(0, badRoot);
    const delta = ps[ps.length - 1][0] - ps[badRoot][0];
    for (let i = 0; i < braket; ++i)
        resultPS = resultPS.concat(badPart.map(scl => [scl[0] + delta * i, scl[1]]));
    return resultPS;
};
const ExpandWeakSubspeciesPairSeq = (ps, braket) => {
    if (ps.length === 0)
        return ps;
    const CalcParent0 = (x) => {
        let r = x - 1;
        while (r >= 0 && ps[r][0] >= ps[x][0])
            --r;
        return r;
    };
    //末尾を切るパターン
    if (CalcParent0(ps.length - 1) === -1)
        return ps.slice(0, -1);
    const parent0 = [...Array(ps.length)].map((_, x) => CalcParent0(x));
    const CalcParent1 = (x) => {
        let r = parent0[x];
        while (r >= 0 && ps[r][1] >= ps[x][1])
            r = parent0[r];
        return r;
    };
    //横に増えるパターン
    if (CalcParent1(ps.length - 1) === -1) {
        const badRoot = parent0[ps.length - 1];
        const badPart = ps.slice(badRoot, -1);
        let resultPS = ps.slice(0, badRoot);
        for (let _i = 0; _i < braket; ++_i)
            resultPS = resultPS.concat(badPart);
        return resultPS;
    }
    //縦に増えるパターン
    const parent1 = [...Array(ps.length)].map((_, x) => CalcParent1(x));
    const badRoot = parent1[ps.length - 1];
    const badPart = ps.slice(badRoot, -1);
    let resultPS = ps.slice(0, badRoot);
    const delta0 = ps[ps.length - 1][0] - ps[badRoot][0];
    const delta1 = ps[ps.length - 1][1] - ps[badRoot][1] - 1;
    const CalcAscendable = (x) => {
        if (x === badRoot)
            return 1;
        else if (x > badRoot)
            return CalcAscendable(parent1[x]);
        else
            return 0;
    };
    for (let i = 0; i < braket; ++i)
        resultPS = resultPS.concat(badPart.map((scl, x) => [scl[0] + delta0 * i, scl[1] + delta1 * CalcAscendable(x + badRoot) * i]));
    return resultPS;
};
const ExpandWeakHyperPairSeq = (ps, braket) => {
    if (ps.length === 0)
        return ps;
    const CalcParent0 = (x) => {
        let r = x - 1;
        while (r >= 0 && ps[r][0] >= ps[x][0])
            r--;
        return r;
    };
    if (CalcParent0(ps.length - 1) === -1)
        return ps.slice(0, -1);
    const parent0 = [...Array(ps.length)].map((_, x) => CalcParent0(x));
    const CalcParent1 = (x) => {
        let r = parent0[x];
        while (r >= 0 && ps[r][1] >= ps[x][1])
            r = parent0[r];
        return r;
    };
    if (CalcParent1(ps.length - 1) === -1) {
        const badRoot = parent0[ps.length - 1];
        const badPart = ps.slice(badRoot, -1);
        let resultPS = ps.slice(0, badRoot);
        for (let _i = 0; _i < braket; ++_i)
            resultPS = resultPS.concat(badPart);
        return resultPS;
    }
    const parent1 = [...Array(ps.length)].map((_, x) => CalcParent1(x));
    const difference = [...Array(ps.length)].map((_, x) => parent1[x] === -1 ? 0 : ps[x][1] - ps[parent1[x]][1]);
    if (difference[ps.length - 1] === 1) {
        const badRoot = parent1[ps.length - 1];
        const badPart = ps.slice(badRoot, -1);
        let resultPS = ps.slice(0, badRoot);
        const delta0 = ps[ps.length - 1][0] - ps[badRoot][0];
        for (let i = 0; i < braket; ++i)
            resultPS = resultPS.concat(badPart.map(scl => [scl[0] + delta0 * i, scl[1]]));
        return resultPS;
    }
    const CalcParent2 = (x) => {
        let r = parent1[x];
        while (r >= 0 && difference[r] >= difference[x])
            r = parent1[r];
        return r;
    };
    const badRoot = CalcParent2(ps.length - 1);
    const badPart = ps.slice(badRoot, -1);
    let resultPS = ps.slice(0, badRoot);
    const delta0 = ps[ps.length - 1][0] - ps[badRoot][0];
    const delta1 = ps[ps.length - 1][1] - ps[badRoot][1] - 1;
    const CalcAscendable = (x) => {
        if (x === badRoot)
            return 1;
        else if (x > badRoot)
            return CalcAscendable(parent1[x]);
        else
            return 0;
    };
    for (let i = 0; i < braket; ++i)
        resultPS = resultPS.concat(badPart.map((scl, x) => [scl[0] + delta0 * i, scl[1] + delta1 * CalcAscendable(x + badRoot) * i]));
    return resultPS;
};
const PSgeqPS = (ps1, ps2) => {
    if (ps2.length === 0)
        return true;
    if (ps1.length === 0)
        return false;
    const ps1Norm = ps1.map(scl => [scl[0] - ps1[0][0], scl[1]]);
    const ps2Norm = ps2.map(scl => [scl[0] - ps2[0][0], scl[1]]);
    for (let i = 0; i < ps1.length && i < ps2.length; ++i)
        if (ps1Norm[i][0] < ps2Norm[i][0] || (ps1Norm[i][0] === ps2Norm[i][0] && ps1Norm[i][1] < ps2Norm[i][1]))
            return false;
    if (ps1.length < ps2.length)
        return false;
    return true;
};
const ExpandPorkHydra = (ps, braket) => {
    if (ps.length === 0)
        return ps;
    const CalcParent0 = (x) => {
        let r = x - 1;
        while (r >= 0 && ps[r][0] >= ps[x][0])
            --r;
        return r;
    };
    //末尾切るパターン
    if (CalcParent0(ps.length - 1) === -1)
        return ps.slice(0, -1);
    const parent0 = [...Array(ps.length)].map((_, x) => CalcParent0(x));
    const CalcParent1 = (x) => {
        let r = parent0[x];
        while (r >= 0 && ps[r][1] >= ps[x][1])
            r = parent0[r];
        return r;
    };
    //横に増えるパターン
    if (CalcParent1(ps.length - 1) === -1) {
        const badRoot = parent0[ps.length - 1];
        const badPart = ps.slice(badRoot, -1);
        let resultPS = ps.slice(0, badRoot);
        for (let _i = 0; _i < braket; ++_i)
            resultPS = resultPS.concat(badPart);
        return resultPS;
    }
    //縦に増えるパターン
    const parent1 = [...Array(ps.length)].map((_, x) => CalcParent1(x));
    const badRoot = ps[ps.length - 1][1] - ps[parent1[ps.length - 1]][1] > 1
        ? parent1[ps.length - 1] : (() => {
            const granpa = parent1[parent1[ps.length - 1]];
            let uncle = [parent1[ps.length - 1]];
            for (let y = parent0[parent1[ps.length - 1]]; y > granpa; y = parent0[y])
                if (parent1[y] === granpa)
                    uncle.push(y);
            for (let i = 1; i < uncle.length; ++i)
                if (!PSgeqPS(ps.slice(uncle[i]), ps.slice(uncle[0])))
                    return uncle[i - 1];
            return uncle[uncle.length - 1];
        })();
    const badPart = ps.slice(badRoot, -1);
    let resultPS = ps.slice(0, badRoot);
    const delta0 = ps[ps.length - 1][0] - ps[badRoot][0];
    const delta1 = ps[ps.length - 1][1] - ps[badRoot][1] - 1;
    const CalcAscendable = (x) => {
        if (x === badRoot)
            return 1;
        else if (x > badRoot)
            return CalcAscendable(parent1[x]);
        else
            return 0;
    };
    for (let i = 0; i < braket; ++i)
        resultPS = resultPS.concat(badPart.map((scl, x) => [scl[0] + delta0 * i, scl[1] + delta1 * CalcAscendable(x + badRoot) * i]));
    return resultPS;
};
function setup() {
    createCanvas(1, 1, document.getElementById('p5_draw_area'));
    frameRate(5);
    textAlign(CENTER, CENTER);
};
function draw() {

}
const DrawHydra = (ps, node_bottom) => {
    let most_right_pos = [];
    for (let i = 0; i < ps.length; ++i) {
        if (ps[i][0] < most_right_pos.length)
            most_right_pos[ps[i][0]] = i;
        else
            most_right_pos.push(i);
        if (ps[i][0] !== 0)
            line((0.5 + most_right_pos[ps[i][0] - 1]) * margin_right_node, (node_bottom - ps[i][0] + 1) * margin_top_node, (0.5 + i) * margin_right_node, (node_bottom - ps[i][0]) * margin_top_node);
    }
    for (let i = 0; i < ps.length; ++i) {
        circle((0.5 + i) * margin_right_node, (node_bottom - ps[i][0]) * margin_top_node, 15);
        text(ps[i][1], (0.5 + i) * margin_right_node, (node_bottom - ps[i][0]) * margin_top_node);
    }
};
const ExpandFinalLine = () => {
    const finalPS = Str2PS(ps_input.value.replace(/\r\n|\r/g, '\n').split('\n').pop());
    switch (ps_name.value) {
        case 'Normal Pair Seq':
            const resultPS_normal = ExpandNormalPairSeq(finalPS, parseInt(ps_braket.value));
            ps_input.value = ps_input.value + '\n' + PS2Str(resultPS_normal);
            break;
        case 'Weak Subspecies Pair Seq':
            const resultPS_sub = ExpandWeakSubspeciesPairSeq(finalPS, parseInt(ps_braket.value));
            ps_input.value = ps_input.value + '\n' + PS2Str(resultPS_sub);
            break;
        case 'Weak Hyper Pair Seq':
            const resultPS_hyper = ExpandWeakHyperPairSeq(finalPS, parseInt(ps_braket.value));
            ps_input.value = ps_input.value + '\n' + PS2Str(resultPS_hyper);
            break;
        case 'Pork Hydra':
            const resultPS_pork = ExpandPorkHydra(finalPS, parseInt(ps_braket.value));
            ps_input.value = ps_input.value + '\n' + PS2Str(resultPS_pork);
            break;
    }
    Refresh();
};

function Refresh() {
    background('white');
    const pss = ps_input.value.replace(/\r\n|\r/g, '\n').split('\n').map(str => Str2PS(str));
    const heights = pss.map(ps => 1 + Math.max(...ps.map(s => s[0])));
    const width_canvas = Math.max(...pss.map(ps => ps.length));
    resizeCanvas((width_canvas + 2) * margin_right_node, (heights.reduce((sum, height) => sum + height, 0) + 2) * margin_top_node);
    let height_hydra_all = 0;
    for (let i = 0; i < pss.length; ++i) {
        height_hydra_all += heights[i];
        DrawHydra(pss[i], height_hydra_all);
    }
}