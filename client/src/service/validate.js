export function replaceDangerScriptTag(input) {
  input = input.replace(/\<[/]{0,1}script[^\>]*\>/gm, '') 
  return input
}

export function validateScriptTag(input){
    return input.match(/(<|%3C)script[\s\S]*?(>|%3E)[\s\S]*?(<|%3C)(\/|%2F)script[\s\S]*?(>|%3E)/gi)
}