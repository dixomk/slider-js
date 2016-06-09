function Slider(conf){
				var config = conf || {},
					self = this;
					
					this.prevMousePosition = 0;
					this.count = 1;
					this.container = document.querySelector(config.container);
					this.items = conf.items || [];
					this.direction = conf.moveTo || -1;
					this.slider = document.createElement("ul");
					this.blockSize = conf.blockSize || 300;
					this.speed = conf.speed || 3000;
					this.timerID;
										
					this.create = function(){
							var li,
								first,
								last,
								self = this;
								
							this.slider.className = "slider";
						
							this.items.forEach(function(el){
								li = document.createElement("li");
								li.className = "item";
								img = document.createElement("span");
								img.innerHTML = el;
								li.appendChild(img);
								self.slider.appendChild(li);
							});
							
							last = self.slider.lastChild;
							first = self.slider.firstChild;
							clone = last.cloneNode(true);
							self.slider.insertBefore(clone,first);
							self.slider.appendChild(first.cloneNode(true));
													
							self.container.appendChild(self.slider);
																
						}
								 
							function moveTo(dir){
								index =  self.count; 
								dir = dir || self.direction;
								if(!self.slider.classList.contains("move")){
									self.slider.classList.add("move");
								}
								self.slider.style.marginLeft = index * dir * self.blockSize + "px";
							}
							function finishedTransition(){
								if(self.count >= self.items.length+2){
									self.slider.classList.remove("move");
									self.slider.style.marginLeft = -self.blockSize+"px";
									self.count = 2;
								}else if(self.count <= 0){
									self.slider.classList.remove("move");
									self.slider.style.marginLeft = self.blockSize * self.items.length + "px";
									self.count = 4;
								}
								self.finished = true;
								//console.log("stop");
							}
							function animatetoLeft(){
								moveTo();
								self.timerID = setTimeout(animatetoLeft,self.speed);
								self.count++;
							}
														
							function stopTransition(){
								clearTimeout(self.timerID);
							}
							
							function mouseDown(event){
								stopTransition();
								self.prevMousePosition = event.clientX;
								return false;
							}
							
							function mouseUp(event){
								var direction = (self.prevMousePosition - event.clientX < 0) ? 1 : -1;
							//	console.log("current",self.count,self.prevMousePosition - event.clientX);
								self.count = self.count - direction-1; 
								moveTo(direction);
								animatetoLeft();
							}
							
							self.slider.addEventListener("transitionend",finishedTransition);
							self.slider.addEventListener("mousedown",mouseDown);
							self.slider.addEventListener("mouseup",mouseUp);
							animatetoLeft();
	}
			
						
			
			