use std::io::Result;
fn main() -> Result<()> {
    prost_build::compile_protos(&["../schema/server-message.proto"], &["../schema"])?;
    Ok(())
}
