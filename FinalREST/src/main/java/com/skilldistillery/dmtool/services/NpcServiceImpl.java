package com.skilldistillery.dmtool.services;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;

import com.skilldistillery.dmtool.entities.Npc;
import com.skilldistillery.dmtool.repositories.CampaignRepository;
import com.skilldistillery.dmtool.repositories.NpcRepository;

public class NpcServiceImpl implements NpcService {
	
	@Autowired
	private NpcRepository npcRepo;
	@Autowired
	private CampaignRepository campRepo;

	@Override
	public Set<Npc> index(int cid) {
		return (Set<Npc>) npcRepo.findByCampaign_Id(cid);
	}

	@Override
	public Npc show(int mid) {
		return npcRepo.findById(mid).get();
	}

	@Override
	public Npc create(int cid, Npc npc) {
		npc.setCampaign(campRepo.findOneById(cid));
		return npcRepo.saveAndFlush(npc);
	}

	@Override
	public Npc update(int nid, Npc npc) {
		npc.setId(nid);
		return npcRepo.saveAndFlush(npc);
	}

	@Override
	public void destroy(int nid) {
		npcRepo.deleteById(nid);
	}

}
